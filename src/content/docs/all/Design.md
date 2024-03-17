---
title: Design
---

## Chars
Illustrate complex data relations, show trends, patterns and summarize information

Types
- COMPARISON - show diff and similarities in data
	- bar and column charts - represent simple nominal data
		- more complex data can be shown via stacked variations
		- DOs // start from zero, sort data, use single collor
	- horizontal/vertical dot plot - represent data with possibility to add color/dot size measurement
		- DON'T use dot plot for dense data sets
- TRENDING - represent data change over time
	- line chart - represent one or more(usually up to 4) data change trend over time
		- DON'Ts // mix measurements, add to much values(lines), mix units
- RELATIONSHIP - show relation/correlation between values
	- scatter plot - more complex variation of dot plot, often with size/color difference in dots
		- DOs // start from zero, highlight patterns via colors
- COMPOSITIONS - show relative values, or values total makeup
	- pie chars - highlight relative value(percentages) of some absolute value
		- DOs // add 2-5 values, sort data clockwise
	- treemap - show composition of hierarchical data via nested rectangles
		- DOs // sort left-to-right + largest-smallest + top-bottom
- DISTRIBUTION - show volume distribution, anomalies and patterns
	- heatmap - show density/concentration patterns for single value via color change
		- DOs // use single color + different shades
	- matrix chart - same as heatmap, but including more data via bubble size
		- DOs // use single color + different shades
- METRIC - show progress
	- flat gauge(like line loading) - show progress towards some metric
	- polar gauge - show progress in circle
		- can be draining or filling the circle
	- ratings chart - similar to flat gauge, but have fixed steps and step count
		- example:
			- rating: |x x x 0 0|
			- flat: |\=\=\=\=---|
	- DOs // add reference points(average, target etc), keep polar gauge big enough and use flat for smaller spaces
- LOCATION - show data in geographic map
	- map - geo areas are highlighted via color
	- bubble map - dot chart on map
	- geo map - dot chart with different dot colors
	- DOs // show specific regions and not all globe, use single color
- PIPLINE - show progress in stages and flow between stages
	- funnel chart - represent stages, based on value of stage
		- DOs // use related values, sort values
	- waterfall chart - break trending plot into stages, color rectangle from starting to ending stage values and you will get ~~trading~~ waterfall chart
		- DOs // use meaningful colors(increase, decrease, no change), show start-end of some period of time broken into stages
	- origami chart - show not sequential data, with single measure
	- sankey chart - show how value flow between two groups
		- can show negative data too

Color - important part of storytelling and user guidance
- color pallet must be accessible and big enough
	- color pallet must work with light/dark modes via hue change
- DOs
	- associate value and color across all charts
	- pie chart must use different colors and not gradient, use minimalistic colors
	- use color with cultural meaning, but remember that different cultures == different meanings
	- remember about accessibility
	- don't overload interface(keep around 5 elements)
