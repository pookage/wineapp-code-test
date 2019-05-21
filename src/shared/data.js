async function fetchWines(parameters, list = []){

	if(parameters){

		const {
			filters = {}, // (object) containing top-level filters (see below)
			limit = 25,   // (number)[INT] max wine objects to return per request
			page  = 1,    // (number)[INT] paginated wines as offset by multiples of 'limit'
			sort_by,      // (string)[price_high_low, price_low_high, most_reviewed]
		} = parameters;

		const {
			price_max,          // (number)[INT]
			price_min,          // (number)[INT]
			wine_color,         // (string)[red, white, rose, sparkling]
			include_categories, // (array) of slug strings from the filters endpoint
			exclude_categories, // (array) of slug strings from the filters endpoint
		} = filters

		const endpoint = "https://test.wineapp.me/api/v1/wines";
		const options  = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(parameters)
		};

		try {

			//grab more wines from the endpoint and add them to the list
			const results  = await fetch(endpoint, options).then(response => response.json());
			const wines    = [ ...list, ...results.wines ];

			//if there's more wines to fetch, go fetch'em...
			if(results.wines.length == limit) {
				return fetchWines({
					...parameters,
					page: page+1
				}, wines);
			} 
			//...otherwise just return what we've got
			else return wines;

		} catch(error) {
			console.error(error);
			return [];
		}
		
	} 

	//if there's no query then assume it's a debug and just return local placeholder data
	else return placeholder__wines;
}//fetchWines

async function fetchWineDetails(id){

	const endpoint = `https://test.wineapp.me/api/v1/wines/${id}`;

	try {
		const result = await fetch(endpoint).then(response => response.json());
		return result.wine;
	} catch(error){
		console.error(error);
		return {};
	}
}//fetchWineDetails

const placeholder__wines = [
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTMzODY4NTUxMw==",
	"rebuy_rating": 91,
	"producer": {
	  "name": "Cave Saint Désirat",
	  "media": [],
	  "id": 111,
	  "about": "Founded in 1960, Cave Saint Desirat is located on the terraced vineyards bordering the right bank of the River Rhone, part of the Saint Joseph appellation. Their vineyards stretch over 600 hectares of which all their grapes are picked by hand and pressed into wine with controlled vinification and high-performance equipment."
	},
	"price": {
	  "original": 11.0,
	  "currency": "GBP",
	  "actual": 9.85
	},
	"name": "Syrah",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "xtw4mlvtiej74p4nojdg",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 290
  },
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTM0OTEzODUwNQ==",
	"rebuy_rating": 89,
	"producer": {
	  "name": "Vignoble Dubard",
	  "media": [],
	  "id": 112,
	  "about": "In 1977, the Dubard family settled as winemakers on the hillsides overlooking the right bank of the River Dordogne, in south west France, and set up the cellars in 18th century stone buildings typical of the area. Today they own 83 hectares on vines with 50% white (Sauvignon, Sémillon and Muscadelle) and 50% red grape (Merlot, Cabernet Franc, Cabernet Sauvignon and Malbec) varietals."
	},
	"price": {
	  "original": 10.5,
	  "currency": "GBP",
	  "actual": 9.95
	},
	"name": "Château Laulerie Merlot Bergerac",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "tqirjmwdie1vt44etmvb",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 222
  },
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTM3NTQxODQ0MQ==",
	"rebuy_rating": 92,
	"producer": {
	  "name": "Sartori",
	  "media": [],
	  "id": 130,
	  "about": "The Satori family has been the leading producer in the Verona region for over 100 years. Satori produce the areas famous and historic Amarone, Valpolicella, Bardolino and Soave. A constant theme over the last century has been the Sartori family’s bond with their land: it is a heritage that has evolved and is reflected in their new interpretations of the great classical Veronese wines, as well as in their innovative expressions of traditional varietals."
	},
	"price": {
	  "original": null,
	  "currency": "GBP",
	  "actual": 9.95
	},
	"name": "Pinot Grigio delle Venezie IGT",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "l6rk7xvxbagyqux1aa76",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 304
  },
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTMzNzYwNDE2OQ==",
	"rebuy_rating": 90,
	"producer": {
	  "name": "Vignoble Dubard",
	  "media": [],
	  "id": 112,
	  "about": "In 1977, the Dubard family settled as winemakers on the hillsides overlooking the right bank of the River Dordogne, in south west France, and set up the cellars in 18th century stone buildings typical of the area. Today they own 83 hectares on vines with 50% white (Sauvignon, Sémillon and Muscadelle) and 50% red grape (Merlot, Cabernet Franc, Cabernet Sauvignon and Malbec) varietals."
	},
	"price": {
	  "original": null,
	  "currency": "GBP",
	  "actual": 10.49
	},
	"name": "Château Laulerie Sauvignon Blanc Bergerac",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "vnrjdsfv4rxbbzxkiiqs",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 247
  },
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTM3NzEyMjM3Nw==",
	"rebuy_rating": 86,
	"producer": {
	  "name": "Ken Forrester Wines",
	  "media": [
		{
		  "type": "image",
		  "subtype": null,
		  "public_id": "cnjithkpzjmfnec7uqwn",
		  "background_color": "#D5AB44"
		}
	  ],
	  "id": 1,
	  "about": "Situated on the slopes of the Helderberg Mountain, in the heart of South Africa's most famous wine region Stellenbosch, Ken Forrester's vineyards are commonly referred to as the Home of Chenin Blanc and other premium award-winning wines.Ken Forrester represents the true pioneering spirit of the post-apartheid South African wine industry."
	},
	"price": {
	  "original": 12.0,
	  "currency": "GBP",
	  "actual": 10.95
	},
	"name": "Petit Pinotage",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "xew87jvv9xazytqmk836",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 1
  },
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTM1OTE2NTUxMw==",
	"rebuy_rating": 93,
	"producer": {
	  "name": "Ken Forrester Wines",
	  "media": [
		{
		  "type": "image",
		  "subtype": null,
		  "public_id": "cnjithkpzjmfnec7uqwn",
		  "background_color": "#D5AB44"
		}
	  ],
	  "id": 1,
	  "about": "Situated on the slopes of the Helderberg Mountain, in the heart of South Africa's most famous wine region Stellenbosch, Ken Forrester's vineyards are commonly referred to as the Home of Chenin Blanc and other premium award-winning wines.Ken Forrester represents the true pioneering spirit of the post-apartheid South African wine industry."
	},
	"price": {
	  "original": null,
	  "currency": "GBP",
	  "actual": 10.95
	},
	"name": "Petit Rosé",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "x5lk5nqswtojulfovmqv",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 133
  },
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTM4OTE0ODIzMw==",
	"rebuy_rating": 89,
	"producer": {
	  "name": "Ken Forrester Wines",
	  "media": [
		{
		  "type": "image",
		  "subtype": null,
		  "public_id": "cnjithkpzjmfnec7uqwn",
		  "background_color": "#D5AB44"
		}
	  ],
	  "id": 1,
	  "about": "Situated on the slopes of the Helderberg Mountain, in the heart of South Africa's most famous wine region Stellenbosch, Ken Forrester's vineyards are commonly referred to as the Home of Chenin Blanc and other premium award-winning wines.Ken Forrester represents the true pioneering spirit of the post-apartheid South African wine industry."
	},
	"price": {
	  "original": 12.0,
	  "currency": "GBP",
	  "actual": 10.95
	},
	"name": "Petit Cabernet Sauvignon",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "uyficf77ctipnghb2inz",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 283
  },
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTM4ODk1MTYyNQ==",
	"rebuy_rating": 90,
	"producer": {
	  "name": "Cave de l'Ormarine",
	  "media": [],
	  "id": 131,
	  "about": "Omarine cellar based in the heartland of Occitania was founded from the merging of 5 fine cooperative cellars in the South of France - Villeveyrac, Pinet, Cournonterral, Saint Hippolyte du Fort and Vias. The wineries flagship Picpoul wines are fresh and terroir-driven, and hugely influenced by both the Mediterranean Sea and the Etang de Thau (the largest of a string of lagoons that stretch along the French coast from the Rhône River to the foothills of the Pyrenees and the border to Spain in the Languedoc-Roussillon), which act as a thermal regulator for the vineyards."
	},
	"price": {
	  "original": null,
	  "currency": "GBP",
	  "actual": 11.5
	},
	"name": "Les Prades Picpoul de Pinet",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "xaszerarnax205cqtqep",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 284
  },
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTM3ODg1OTA4MQ==",
	"rebuy_rating": 82,
	"producer": {
	  "name": "Sierra Cantabria",
	  "media": [
		{
		  "type": "image",
		  "subtype": null,
		  "public_id": "esyw2izqmr7a4s8a63um",
		  "background_color": "#D5AB44"
		},
		{
		  "type": "image",
		  "subtype": null,
		  "public_id": "r4jlc0tdrayjj9fct9gc",
		  "background_color": "#D5AB44"
		}
	  ],
	  "id": 17,
	  "about": "Based in a town of great winemaking tradition lies Sierra Cantabria. Founded in 1957 by Guillermo Eguren, Sierra Cantabria is based in San Vicente de la Sonsierra. The winery belongs to the Eguren family, a family which has been making wine for five generations. The wines of Sierra Cantabria are wines with a classic Rioja style. They try to provide somewhat more modernity, leaving the wood in the background and making the fruit and the intensity stand out."
	},
	"price": {
	  "original": 13.0,
	  "currency": "GBP",
	  "actual": 11.95
	},
	"name": "Rioja Rosado",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "wdycirli3eptuymewrgj",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 135
  },
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTM2NjU3MTA4MQ==",
	"rebuy_rating": 88,
	"producer": {
	  "name": "Ken Forrester Wines",
	  "media": [
		{
		  "type": "image",
		  "subtype": null,
		  "public_id": "cnjithkpzjmfnec7uqwn",
		  "background_color": "#D5AB44"
		}
	  ],
	  "id": 1,
	  "about": "Situated on the slopes of the Helderberg Mountain, in the heart of South Africa's most famous wine region Stellenbosch, Ken Forrester's vineyards are commonly referred to as the Home of Chenin Blanc and other premium award-winning wines.Ken Forrester represents the true pioneering spirit of the post-apartheid South African wine industry."
	},
	"price": {
	  "original": null,
	  "currency": "GBP",
	  "actual": 11.95
	},
	"name": "Petit Chenin Blanc",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "tjinayn55257waeyf4gf",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 218
  },
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTM3NjU5ODA4OQ==",
	"rebuy_rating": 88,
	"producer": {
	  "name": "Thelema Mountain Vineyards",
	  "media": [
		{
		  "type": "image",
		  "subtype": null,
		  "public_id": "zadmiqnaunozjzcsockb",
		  "background_color": "#D5AB44"
		}
	  ],
	  "id": 2,
	  "about": "Established by Gyles and Barbara Webb in 1983 with the backing of Barbara's parents, the 62 hectare Thelma farm is  family owned and based at the top of the Helshoogte Pass in Stellenbosch, South Africa. The high altitude and deep red soils are ideal for premium quality wine grape production and Thelma's wines continue to be some of the most prestigious wines in South Africa."
	},
	"price": {
	  "original": 13.5,
	  "currency": "GBP",
	  "actual": 12.29
	},
	"name": "Mountain Red Blend",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "qkj1gltbbdyovfsjr7we",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 3
  },
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTM0MzA3NjQyNQ==",
	"rebuy_rating": 84,
	"producer": {
	  "name": "Franck Massard",
	  "media": [
		{
		  "type": "image",
		  "subtype": null,
		  "public_id": "yjadnkfmnao1yky0c8fy",
		  "background_color": "#D5AB44"
		}
	  ],
	  "id": 8,
	  "about": "Franck Massard's wines all began when Frank and an old friend of his decided to aqquire a vineyard in Spain's Priorat region in 2004. Franck's passion grew and he started to create new wines from lesser known regions like Ribeira Sacra, Terra Alta, and Valdeorras, wines with a real sense of place. His mission is nurturing what nature provides, highlighting the undiscovered and sharing it with you."
	},
	"price": {
	  "original": null,
	  "currency": "GBP",
	  "actual": 12.49
	},
	"name": "Más Amor Rosado",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "irn5ual70egoaoyvrdgr",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 134
  },
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTM2MDAxNzQ4MQ==",
	"rebuy_rating": 95,
	"producer": {
	  "name": "Humberto Canale",
	  "media": [
		{
		  "type": "image",
		  "subtype": null,
		  "public_id": "qnm4s1qpwvtmlxm042r3",
		  "background_color": "#D5AB44"
		},
		{
		  "type": "image",
		  "subtype": null,
		  "public_id": "gfraydlyscycamtlpmbs",
		  "background_color": "#D5AB44"
		}
	  ],
	  "id": 3,
	  "about": "Humberto Canale founded the winery based in the heart of the Rio Negro province in 1909. Humberto bought 200 hectares in the wild location and imported the necessary equipment to develop the viticulture in the region. Four generations later, the winery combines the founder's wisdom regarding handmade processes with the most update techniques, which allows it to produce fine wines of international quality."
	},
	"price": {
	  "original": null,
	  "currency": "GBP",
	  "actual": 12.49
	},
	"name": "Íntimo Blanco",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "xhprx94pntv8rce8whaz",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 166
  },
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTM3ODU5NjkzNw==",
	"rebuy_rating": 87,
	"producer": {
	  "name": "Bertani",
	  "media": [
		{
		  "type": "image",
		  "subtype": null,
		  "public_id": "osvmfps5ufbz4vutr87y",
		  "background_color": "#D5AB44"
		}
	  ],
	  "id": 18,
	  "about": "First established in 1857, Bertani is still family-owned and their vineyard holdings now comprise of over 200 hectares in the classic areas of Valpolicella, Valpantena, Soave, and Lake Garda. Bertani believe in authenticity which is why much of their packaging has remained the same since 1958."
	},
	"price": {
	  "original": null,
	  "currency": "GBP",
	  "actual": 13.49
	},
	"name": "Berta Rose Chiaretto IGT",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "jpvfpejizzezcoipz57g",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 137
  },
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTM1NzUyNzExMw==",
	"rebuy_rating": 80,
	"producer": {
	  "name": "Chaffey Bros Wine Co",
	  "media": [],
	  "id": 97,
	  "about": null
	},
	"price": {
	  "original": 15.0,
	  "currency": "GBP",
	  "actual": 13.95
	},
	"name": "Not Your Grandma's Rosé",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "ylo7em2xzc2s0hisp7yz",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 138
  },
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTM2Nzg0OTAzMw==",
	"rebuy_rating": 80,
	"producer": {
	  "name": "Chateau Ste Michelle",
	  "media": [
		{
		  "type": "image",
		  "subtype": null,
		  "public_id": "khrcixqk7qchbfebkhzc",
		  "background_color": "#D5AB44"
		}
	  ],
	  "id": 12,
	  "about": "Established in 1934 Chateau Ste Michelle is the founding winery of the Washington state. Chateau Ste. Michelle is one of the few premium wineries in the world with two state-of-the-art wineries, one for red and one for white. The winery combines an ongoing dedication to research and innovation with a commitment to classic winemaking traditions to craft the highest quality wines from Washington across many price points. This dedication to excellence and commitment to quality have allowed Chateau Ste. Michelle a place among the pre-eminent wine producers of the world."
	},
	"price": {
	  "original": null,
	  "currency": "GBP",
	  "actual": 13.95
	},
	"name": "Columbia Valley Riesling",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "oreoltr2ygo46xoaeif1",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 168
  },
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTM3OTAyMjkyMQ==",
	"rebuy_rating": 90,
	"producer": {
	  "name": "Fontanafredda",
	  "media": [
		{
		  "type": "image",
		  "subtype": null,
		  "public_id": "iafkmifmwl9esmag3qky",
		  "background_color": "#D5AB44"
		}
	  ],
	  "id": 5,
	  "about": "Founded in 1858 Fontanafredda lies within The Langhe in the Piedmont region of Italy. The Langhe are a historic region of Piedmont, positioned between 450 and 800 meters above sea level, in an area that lies between the Tanaro and Bormida rivers, between the provinces of Cuneo and Asti. Fontanafredda produces 8,500,000 bottles of wine each year and are among the biggest private producers of Barolo: with 780,000 bottles each year, about 6% of the entire production."
	},
	"price": {
	  "original": null,
	  "currency": "GBP",
	  "actual": 13.95
	},
	"name": "Briccotondo Barbera Piemonte DOC",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "baovnfwkaz3wosn9nqyj",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 220
  },
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTM1MTc5MjcxMw==",
	"rebuy_rating": 76,
	"producer": {
	  "name": "Fontanafredda",
	  "media": [
		{
		  "type": "image",
		  "subtype": null,
		  "public_id": "iafkmifmwl9esmag3qky",
		  "background_color": "#D5AB44"
		}
	  ],
	  "id": 5,
	  "about": "Founded in 1858 Fontanafredda lies within The Langhe in the Piedmont region of Italy. The Langhe are a historic region of Piedmont, positioned between 450 and 800 meters above sea level, in an area that lies between the Tanaro and Bormida rivers, between the provinces of Cuneo and Asti. Fontanafredda produces 8,500,000 bottles of wine each year and are among the biggest private producers of Barolo: with 780,000 bottles each year, about 6% of the entire production."
	},
	"price": {
	  "original": null,
	  "currency": "GBP",
	  "actual": 13.95
	},
	"name": "Moncucco Moscato d'Asti",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "zosrfu2w4uq0ak9gtzmb",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 249
  },
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTM3MDY2NzA4MQ==",
	"rebuy_rating": 84,
	"producer": {
	  "name": "Bertani",
	  "media": [
		{
		  "type": "image",
		  "subtype": null,
		  "public_id": "osvmfps5ufbz4vutr87y",
		  "background_color": "#D5AB44"
		}
	  ],
	  "id": 18,
	  "about": "First established in 1857, Bertani is still family-owned and their vineyard holdings now comprise of over 200 hectares in the classic areas of Valpolicella, Valpantena, Soave, and Lake Garda. Bertani believe in authenticity which is why much of their packaging has remained the same since 1958."
	},
	"price": {
	  "original": null,
	  "currency": "GBP",
	  "actual": 13.95
	},
	"name": "Due Uve Bianco Pinot Grigio-Sauvignon IGT Venezie",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "nlzn7aysusrm6ai6aefj",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 263
  },
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTMzOTcwMTMyMQ==",
	"rebuy_rating": 95,
	"producer": {
	  "name": "La Mascota",
	  "media": [
		{
		  "type": "image",
		  "subtype": null,
		  "public_id": "dolm9vk272zv5mwkbonx",
		  "background_color": "#D5AB44"
		}
	  ],
	  "id": 7,
	  "about": "Situated in the most renowned and prestigious wine-growing regions in Mendoza, the La Mascota vineyards cover 100 hectares of land. The vineyards lie at foot of the Andes Mountains, barely a thousand metres away from the Mendoza River. The main varieties produced are Cabernet Sauvignon, Malbec, Cabernet Franc and Shiraz among the reds; and Chardonnay among the whites. The oldest wine is a  Cabernet Sauvignon plot which was planted 41 years ago."
	},
	"price": {
	  "original": 15.0,
	  "currency": "GBP",
	  "actual": 13.95
	},
	"name": "La Mascota Malbec",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "fxm7pmtcb4gpy8v7ejgc",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 266
  },
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTMzNzMwOTI1Nw==",
	"rebuy_rating": 84,
	"producer": {
	  "name": "Thelema Mountain Vineyards",
	  "media": [
		{
		  "type": "image",
		  "subtype": null,
		  "public_id": "zadmiqnaunozjzcsockb",
		  "background_color": "#D5AB44"
		}
	  ],
	  "id": 2,
	  "about": "Established by Gyles and Barbara Webb in 1983 with the backing of Barbara's parents, the 62 hectare Thelma farm is  family owned and based at the top of the Helshoogte Pass in Stellenbosch, South Africa. The high altitude and deep red soils are ideal for premium quality wine grape production and Thelma's wines continue to be some of the most prestigious wines in South Africa."
	},
	"price": {
	  "original": 15.0,
	  "currency": "GBP",
	  "actual": 13.95
	},
	"name": "Sauvignon Blanc",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "rbdoh2lf8dtxxrfscvmi",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 287
  },
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTM1NzAzNTU5Mw==",
	"rebuy_rating": 90,
	"producer": {
	  "name": "Quinta Do Crasto",
	  "media": [
		{
		  "type": "image",
		  "subtype": null,
		  "public_id": "wjkuouzhsgi29acv4pon",
		  "background_color": "#D5AB44"
		}
	  ],
	  "id": 4,
	  "about": "Quinta Do Crasto is arguably the finest estate for the production of Red Wine in Portugal. Situated on the North bank of the river Douro, half way between Regua and Pinhao, Quinta Do Crasto is now run by Leonor Roquette, daughter of Fernando Moreira d’Almeida, together with her husband Jorge Roquette and their sons Miguel and Tomás."
	},
	"price": {
	  "original": 15.0,
	  "currency": "GBP",
	  "actual": 13.95
	},
	"name": "Douro White",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "uja03swiavntingntqko",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 296
  },
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTM1MjUxMzYwOQ==",
	"rebuy_rating": 100,
	"producer": {
	  "name": "Yves Cuilleron",
	  "media": [],
	  "id": 113,
	  "about": "Domaine Yves Cuilleron was founded by Claude Cuilleron in 1920. The Cave Cuilleron is, above all, a family estate. Passion for the vine has been part of the genes of the family for three generations. Yves was initially an engineer and this shines through in his wines, he cares about every little detail and the wines are crafted with the utmost precision. Most of Yves’s vineyards are in Chavanay, just south of Condrieu and at the northern end of the very long Saint Joseph appellation."
	},
	"price": {
	  "original": 16.0,
	  "currency": "GBP",
	  "actual": 14.2
	},
	"name": "Syrah Les Vignes d'à Côté",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "gobwhzvddha87biwwtsp",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 223
  },
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTM3ODM2NzU2MQ==",
	"rebuy_rating": 94,
	"producer": {
	  "name": "Humberto Canale",
	  "media": [
		{
		  "type": "image",
		  "subtype": null,
		  "public_id": "qnm4s1qpwvtmlxm042r3",
		  "background_color": "#D5AB44"
		},
		{
		  "type": "image",
		  "subtype": null,
		  "public_id": "gfraydlyscycamtlpmbs",
		  "background_color": "#D5AB44"
		}
	  ],
	  "id": 3,
	  "about": "Humberto Canale founded the winery based in the heart of the Rio Negro province in 1909. Humberto bought 200 hectares in the wild location and imported the necessary equipment to develop the viticulture in the region. Four generations later, the winery combines the founder's wisdom regarding handmade processes with the most update techniques, which allows it to produce fine wines of international quality."
	},
	"price": {
	  "original": null,
	  "currency": "GBP",
	  "actual": 14.95
	},
	"name": "Estate Malbec",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "lhkrt8wrs7osp18hsorg",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 8
  },
  {
	"variant_id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTg2MTM3OTA1NTY4OQ==",
	"rebuy_rating": 91,
	"producer": {
	  "name": "Franck Massard",
	  "media": [
		{
		  "type": "image",
		  "subtype": null,
		  "public_id": "yjadnkfmnao1yky0c8fy",
		  "background_color": "#D5AB44"
		}
	  ],
	  "id": 8,
	  "about": "Franck Massard's wines all began when Frank and an old friend of his decided to aqquire a vineyard in Spain's Priorat region in 2004. Franck's passion grew and he started to create new wines from lesser known regions like Ribeira Sacra, Terra Alta, and Valdeorras, wines with a real sense of place. His mission is nurturing what nature provides, highlighting the undiscovered and sharing it with you."
	},
	"price": {
	  "original": null,
	  "currency": "GBP",
	  "actual": 14.95
	},
	"name": "El Brindis DO Montsant",
	"media": [
	  {
		"type": "image",
		"subtype": null,
		"public_id": "nujllkkrfuakemvor2yu",
		"background_color": null
	  }
	],
	"is_bookmarked": false,
	"is_available": true,
	"id": 10
  }
];

export {
  placeholder__wines,
  fetchWines,
  fetchWineDetails
};