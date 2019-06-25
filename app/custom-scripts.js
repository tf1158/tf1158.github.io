define(["dojo/topic"], function(topic) {
	/*
	* Custom Javascript to be executed while the application is initializing goes here
	*/

	// The application is ready
	topic.subscribe("tpl-ready", function(){
	/*
	 * Custom Javascript to be executed when the application is ready goes here
	 */
	});

	var WEBMAP_ID = "4d240d875bab49f9a48d586362a47772",
		LAYER_ID = "park_explorer_HomePoint_7794";

	var clickHandlerIsSetup = false;

	topic.subscribe("story-loaded-map", function(result){
		if ( result.id == WEBMAP_ID && ! clickHandlerIsSetup ) {
			var map = app.maps[result.id].response.map,
				layer = map.getLayer(LAYER_ID);

			if ( layer ) {
				layer.on("click", function(e){
					var index = e.graphic.attributes["SectionIndex"];
					topic.publish("story-navigate-section", index);
				});
			}
		}
	});
});
