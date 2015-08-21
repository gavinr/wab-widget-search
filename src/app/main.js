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

	'dstore/Filter',
	'dstore/Memory',

	'dojo/domReady!'
], function(
	widgetLocations,
	DijitRegistry, OnDemandGrid,
	TextBox, BorderContainer, ContentPane,
	array, declare, lang, on, all, xhr,
	Filter, Memory
) {
	return {
		startup: function() {
			this.initPageStructure();
			this.getData(widgetLocations).then(lang.hitch(this, 'initComponents'));
		},
		initPageStructure: function() {
			this.borderContainer = new BorderContainer({
				style: 'height: 100%',
				design: 'headline'
			});

			// create a ContentPane as the left pane in the BorderContainer
			this.cp1 = new ContentPane({
				region: "top",
				content: '<div class="title">Web App Builder Widget Search</div>'
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
				content: '<div class="link"><a href="https://github.com/gavinr/wab-widget-search/blob/master/src/app/widget-locations.js" target="_blank">Submit your manifest link here!</a></div>'
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
			data = this.addLinks(data);
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
					link: {
						label: "Link",
						formatter: makeLink
					}
				},
				query: lang.hitch(this, 'queryGrid')
			}, "mainDGrid");
			this.grid.set('sort', 'name');

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
		getData: function(dataUrls) {
			var dl = array.map(dataUrls, function(url) {
				return xhr(url.manifestUrl, {
					handleAs: 'json',
					preventCache: true,
					headers: {
						"X-Requested-With": ""
					},
				});
			});
			return all(dl);
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
		addLinks: function(data) {
			for (var i = 0; i < data.length; i++) {
				data[i].link = widgetLocations[i]['url'];
			}
			return data;
		}
	};
});