define([
	'./widget-locations',

	'dgrid/extensions/DijitRegistry',
	'dgrid/OnDemandGrid',

	'dijit/form/TextBox',
	'dijit/layout/BorderContainer',
	'dijit/layout/ContentPane',

	'dojo/_base/array',
	'dojo/_base/declare',
	'dojo/_base/lang',
	'dojo/on',
	'dojo/promise/all',
	'dojo/request/xhr',
	'dojo/Deferred',

	'dstore/Filter',
	'dstore/Memory',

	'dojo/domReady!'
], function(
	widgetLocations,
	DijitRegistry, OnDemandGrid,
	TextBox, BorderContainer, ContentPane,
	array, declare, lang, on, all, xhr, Deferred,
	Filter, Memory
) {
	return {
		startup: function() {
			this.initPageStructure();
			this.getData(widgetLocations).then(lang.hitch(this, 'initComponents'), function(err) {
				console.log('Error:', err);
			});
		},
		initPageStructure: function() {
			this.borderContainer = new BorderContainer({
				style: 'height: 100%',
				design: 'headline'
			});

			// create a ContentPane as the left pane in the BorderContainer
			this.cp1 = new ContentPane({
				region: "top",
				content: '<div class="title">Web AppBuilder Widget Search</div>'
			});
			this.borderContainer.addChild(this.cp1);

			// create a ContentPane as the center pane in the BorderContainer
			this.cp2 = new ContentPane({
				region: "center",
				content: '<div id="mainDGrid"></div>'
			});
			this.borderContainer.addChild(this.cp2);

			// create a ContentPane as the center pane in the BorderContainer
			this.cp3 = new ContentPane({
				region: "bottom",
				content: '<div class="link"><a href="https://github.com/gavinr/wab-widget-search" target="_blank">Submit your widget to the list!</a> <iframe src="https://ghbtns.com/github-btn.html?user=gavinr&repo=wab-widget-search&type=star&count=false" frameborder="0" scrolling="0" width="50px" height="20px" style="vertical-align: middle; margin-left: 10px;"></iframe></div>'
			});
			this.borderContainer.addChild(this.cp3);

			// put the top level widget into the document, and then call startup()
			this.borderContainer.placeAt(document.body);
		},
		filterGrid: function(grid, memory, searchTerm) {
			var setToMemory;
			// if the search is empty, "turn off" filter
			if (searchTerm === "") {
				setToMemory = this.memory;
			} else {
				var mainFilter;
				// go though each column, applying the filter for each:
				for (var key in grid.columns) {
					if (grid.columns.hasOwnProperty(key)) {
						var columnName = grid.columns[key].id;
						var filter = new Filter().match(columnName, new RegExp(searchTerm + "+", "i"));
						if (mainFilter) {
							mainFilter = new Filter().or(mainFilter, filter);
						} else {
							mainFilter = filter;
						}
					}
				}
				setToMemory = memory.filter(mainFilter);
			}

			// set the memory that we've computed above in the if/else
			grid.set("collection", setToMemory);
		},
		initComponents: function(data) {
			data = data.filter(function(item) {
				if (item.manifest === false) {
					return false;
				}
				return true;
			});
			data = this.addExtras(data);
			this.memory = new Memory({
				data: data,
			});
			// formatters for grid
			var makeLink = function(data) {
				return "<a target=\"_blank\" href=\"" + data + "\">" + data + "</a>";
			};
			var makeLicense = function(data) {
				if (data == 'http://www.apache.org/licenses/LICENSE-2.0') {
					return '<a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache 2.0</a>';
				}
				return data;
			};
			// create the grid. DijitRegistry makes dgrid play well with the BorderContainer.
			var CustomGrid = declare([OnDemandGrid, DijitRegistry]);
			this.grid = new CustomGrid({
				collection: this.memory,
				minRowsPerPage: 100,
				columns: {
					name: 'Name',
					description: 'Description',
					author: 'Author',
					license: {
						label: "License",
						formatter: makeLicense
					},
					popularity: 'Repo Popularity',
					link: {
						label: "Link",
						formatter: makeLink
					}
				},
				query: lang.hitch(this, 'queryGrid')
			}, "mainDGrid");

			// dgrid case-insensitive sort:
			on(this.grid, 'dgrid-sort', lang.hitch(this, 'ciSortHandler'));

			// call the initialSort:
			this.ciSortHandler({
				sort: [{
					property: 'name',
					descending: false
				}]
			});

			this.filterTextBox = new TextBox({
				'class': 'filteringTextBox',
				placeholder: 'Search'
			}).placeAt(this.cp1);
			on(this.filterTextBox, "keyUp", lang.hitch(this, function(name, oldValue, newValue) {
				var searchValue = this.filterTextBox.get("value");
				this.filterGrid(this.grid, this.memory, searchValue);
			}));
			this.borderContainer.startup();
		},
		ciSortHandler: function(evt) {
			var curProp = evt.sort[0].property;
			var descending = evt.sort[0].descending;
			if (curProp == 'name' || curProp == 'description' || curProp == 'author') {
				if (evt.preventDefault) {
					evt.preventDefault();
				}

				this.grid.set("sort", function(a, b) {
					if (a[curProp].toLowerCase() < b[curProp].toLowerCase()) return (descending === true ? 1 : -1);
					if (a[curProp].toLowerCase() > b[curProp].toLowerCase()) return (descending === true ? -1 : 1);
					return 0;
				});
				this.grid.updateSortArrow(evt.sort, true);
			}
		},
		getData: function(dataUrls) {
			var dl = array.map(dataUrls, function(url) {
				return this.getUrl(url.manifestUrl);
			}.bind(this));
			return all(dl);
		},
		getUrl: function(url) {
			var deferred = new Deferred();
			xhr(url, {
				handleAs: 'json',
				preventCache: true,
				headers: {
					"X-Requested-With": ""
				},
			}).then(function(res) {
				xhr(this.getApiUrl(url), {
					handleAs: 'json',
					preventCache: false,
					headers: {
						"X-Requested-With": ""
					},
				}).then(function(githubApiRes) {
					deferred.resolve({
						manifest: res,
						repoData: githubApiRes
					});
				}.bind(this), function(error) {
					console.log('github error', error);
				});
			}.bind(this), function(err) {
				console.log('Invalid URL. The user probably took this repo down: ', url);
				deferred.resolve(false);
			});
			return deferred;
		},
		getApiUrl: function(url) {
			var parts = url.split("/");
			// base used for caching due to GitHub API restrictions. Set 'base' to '' for local testing.
			var base = 'http://gavhost.com/githubApiCache/?url=';
			var repoUrl = base + 'https://api.github.com/repos/' + parts[3] + '/' + parts[4];
			return repoUrl;
		},
		queryGrid: function(item, index, items) {
			var filterString = this.filterTextBox ? this.filterTextBox.get("value") + "" : "";

			// early exists
			if (filterString.length < 2) return true;
			if (!item.name) return false;

			for (var key in item) {
				if (item.hasOwnProperty(key)) {
					var valueToSearch = (item[key] + "").toLowerCase();
					if (~valueToSearch.indexOf(filterString.toLowerCase())) {
						return true;
					}
				}
			}

			// if we haven't returned true, we should not show this.
			return false;
		},
		addExtras: function(data) {
			for (var i = 0; i < data.length; i++) {
				if (data[i] !== false) {
					data[i].manifest.link = widgetLocations[i]['url'];
					data[i].manifest.popularity = data[i].repoData.stargazers_count + data[i].repoData.subscribers_count;
				}
			}

			var retData = data.map(function(obj) {
				return obj.manifest;
			});
			retData = retData.filter(function(obj) {
				if (obj) {
					return obj;
				}
			});
			return retData;
		}
	};
});