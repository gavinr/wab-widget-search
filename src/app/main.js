define([
	'./widget-locations',

	'dgrid/OnDemandGrid',

	'dijit/form/TextBox',

	'dojo/_base/array',
	'dojo/_base/lang',
	'dojo/on',
	'dojo/promise/all',
	'dojo/request/xhr',
	'dojo/store/Memory',
	'dojo/domReady!'
], function(
	widgetLocations,
	OnDemandGrid,
	TextBox,
	array, lang, on, all, xhr, Memory
) {
	return {
		startup: function() {
			this.getData(widgetLocations).then(lang.hitch(this, 'initComponents'));
		},
		initComponents: function(data) {
			this.memory = new Memory({
				data: data
			});

			this.grid = new OnDemandGrid({
				store: this.memory,
				columns: {
					name: 'Name',
					description: 'Description',
					author: 'Author',
				},
				query: lang.hitch(this, 'queryGrid')
			}, 'grid');

			this.filterTextBox = new TextBox().placeAt(document.body, 'first');
			on(this.filterTextBox, "keyUp", lang.hitch(this, function(name, oldValue, newValue) {
				this.grid.refresh();
			}));
		},
		getData: function(dataUrls) {
			var dl = array.map(dataUrls, function(url) {
				return xhr(url, {
					handleAs: 'json',
					preventCache: true,
					headers: {
						"X-Requested-With": ""
					},
				});
			});
			return all(dl)
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
		}
	}
});