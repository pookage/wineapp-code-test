import React from "react";

export default function WineDetails(){


	/* NOTE:
	------------------------------------
	
		You'll need to change the order of the header-items with
		flex to maintain the correct semantic order whilst adopting
		the correct styles

	*/

	return(
		<article>
			<header>
				<div>
					<h2>
						Cave Saint Desirat
					</h2>
					<h1>
						Syrah
					</h1>
					<p aria-label="Current price.">
						£9.85
					</p>
					<p aria-label="Previous price.">
						£11.00
					</p>
				</div>
				<div>
					<img src="header_image.jpg" alt="wine name" />
					<aside>
						<p>
							91% would rebuy
						</p>
						<p>
							10% off
						</p>
					</aside>
				</div>
			</header>
			
			<section>
				<h1>
					About this wine
				</h1>
				<dl>
					<div>
						<dt>Year</dt>
						<dd>2017</dd>
					</div>
					<div>
						<dt>Size</dt>
						<dd>75cl</dd>
					</div>
					<div>
						<dt>
							<abbr title="Alchol by Volume">ABV</abbr>
						</dt>
						<dd>12.5%</dd>
					</div>
				</dl>

				<ul aria-label="Related tags.">
					<li>
						France
					</li>
					<li>
						Syrah
					</li>
					<li>
						Medium
					</li>
				</ul>
			</section>

			<section>
				<h1>
					Flavours
				</h1>
				<p>
					A smooth, medium-bodied red with flavours of red fruit, liquorice and cracked pepper. A pure and expressive wine.
				</p>

				<ul aria-label="Flavours.">
					<li>
						Dark Fruits
					</li>
					<li>
						Peppery
					</li>
					<li>
						Red Berries
					</li>
					<li>
						Liquorice
					</li>
				</ul>
			</section>

			<section>
				<h1>
					Food Pairing
				</h1>
				<p>
					Paired well with rich meat stews, or a tuna steak.
				</p>

				<ul aria-label="Good food pairings.">
					<li>
						Fish
					</li>
					<li>
						Red Meat
					</li>
					<li>
						White Meat
					</li>
				</ul>
			</section>

			<section>
				<h1>
					About the Winemaker
				</h1>
				<p>
					Founded in 1960, Cave Saint Desirat is located on the terraced vineyards bordering the right bank of the River Rhone, part of the Saint Joseph appellation.  TYheir vineyards tretch over 600 hectares of which all their grapes are picked by hand and pressed into wine with controlled vinification and high-performance equipment.
				</p>
				<a href="">
					See more wines from here
				</a>
			</section>

			<aside>
				<h1>
					You may also like
				</h1>
				<ol>
					<li>~~look in the endpoints to see if there's any 'related wines' section~~</li>
				</ol>
			</aside>

		</article>
	);
}//WineDetails