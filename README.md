# Web AppBuilder Widget Search
A simple page to filter and find custom [Web AppBuilder](https://developers.arcgis.com/web-appbuilder/) widgets. 

[![screenshot](https://i.imgur.com/sc9YTC2.png)](https://web-appbuilder-widget-search.surge.sh/)

### To submit your widget to the list

2 easy ways!

1. Create a [new issue](https://github.com/gavinr/wab-widget-search/issues/new) in this repo, or
2. Fork this repo, add your widget to [public/widgets.json](https://github.com/gavinr/wab-widget-search/blob/master/public/widgets.json)

### How does this work?

Our list of widgets are listed on [public/widgets.json](https://github.com/gavinr/wab-widget-search/blob/master/public/widgets.json). Each object in the array can have:

- `url` * - The homepage of the widget.
- `manifestUrl` * - URL to widget manifest file. Should be valid JSON.
- `thumbnail` - URL to image for thumbnail
- `preview` - URL to full application that includes the widget for preview purposes
- `categories` - Array of categories. This widget will show up when any of these categories are selected on the site.

Based on the above, a process enriches the widget data for display on the website. Full schema of JSON that is accessible to the site include:

- `url` - [same as above]
- `manifestUrl` - [same as above]
- `categories` - [same as above]
- `thumbnail` - [same as above]
- `preview` - [same as above]
- `slug` - URL slug based on name
- `name` - directly from `manifest.json`
- `version` - directly from `manifest.json`
- `wabVersion` - directly from `manifest.json`
- `author` - directly from `manifest.json`
- `description` - directly from `manifest.json`
- `copyright` - directly from `manifest.json`
- `license` - directly from `manifest.json`
- `githubStars` - if `url` above is a GitHub url
- `githubForks` - if `url` above is a GitHub url
- `created_at` - if `url` above is a GitHub url
- `geonetLikes` - if `url` above is an Esri Geonet url
- `geonetComments` - if `url` above is an Esri Geonet url
- `geonetViews` - if `url` above is an Esri Geonet url

### Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can run a local version of the site for development by following these steps:

1. Fork and clone this repository.
2. In a terminal, `npm install`
3. `npm start`


### Links

- [Web AppBuilder Widget Search on ArcGIS Online](https://www.arcgis.com/home/item.html?id=961cd43b032d4239b83aba605ac6553c)
