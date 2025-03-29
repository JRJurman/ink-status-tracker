
(() => {
	class TramDeco{static processTemplate(e){[...e.content.children].forEach(e=>{TramDeco.define(e)})}static define(templateElement){const tagName=templateElement.tagName.toLowerCase();class BaseTDElement extends HTMLElement{constructor(e){var t;super(),e&&(this.attachShadow(e),(t=document.createRange()).selectNodeContents(e),this.shadowRoot.append(t.cloneContents()))}}const parentClassName=templateElement.getAttribute("td-extends"),parentClass=customElements.get(parentClassName)||BaseTDElement,modifiedConstructor=templateElement.querySelector('script[td-method="constructor"]');class TDElement extends parentClass{constructor(overrideShadowRoot){super(overrideShadowRoot||templateElement.shadowRoot),eval(modifiedConstructor?.textContent||"")}}templateElement.querySelectorAll("script[td-method]").forEach(lifecycleScript=>{const methodName=lifecycleScript.getAttribute("td-method");TDElement.prototype[methodName]=function(){eval(lifecycleScript.textContent)}}),templateElement.querySelectorAll("script[td-property]").forEach(propertyScript=>{const propertyName=propertyScript.getAttribute("td-property");Object.defineProperty(TDElement,propertyName,{get:function(){return eval(propertyScript.textContent)}})}),customElements.define(tagName,TDElement)}}

	const importTemplate = document.createElement('template')
	importTemplate.setHTMLUnsafe(`<ink-status-description>
	<!-- observed attributes -->
	<script td-property="observedAttributes">
		['burn', 'chill', 'poison', 'terror', 'frailty'];
	</script>

	<template shadowrootmode="open">
		<style>
			button, input {
				font-family: inherit;
			}

			p {
				font-weight: 100;
			}

			strong {
				font-weight: 500;
			}

			.clear {
				padding: 1px;
				line-height: 1em;
			}

			count-span::after {
				display: inline;
				content: " (" attr(count) ") ";
			}

			.tier-1, .tier-2, .tier-3 {
				display: none;
			}

			#burn, #chill, #poison, #terror, #frailty {
				display: none;
			}

			/* burn */
			:host([burn]) #burn {
				display: block;
			}

			:is(:host([burn="1"]), :host([burn="2"]),
					:host([burn="3"]), :host([burn="4"])) #burn span.tier-1 {
				display: inline;
			}

			:is(:host([burn="5"]), :host([burn="6"]), :host([burn="7"]),
					:host([burn="8"]), :host([burn="9"])) #burn span.tier-2 {
				display: inline;
			}

			:is(:host([burn="10"])) #burn span.tier-3 {
				display: inline;
			}

			/* chill */
			:host([chill]) #chill {
				display: block;
			}

			:is(:host([chill="1"]), :host([chill="2"]),
					:host([chill="3"]), :host([chill="4"])) #chill span.tier-1 {
				display: inline;
			}

			:is(:host([chill="5"]), :host([chill="6"]), :host([chill="7"]),
					:host([chill="8"]), :host([chill="9"])) #chill span.tier-2 {
				display: inline;
			}

			:is(:host([chill="10"])) #chill span.tier-3 {
				display: inline;
			}

			/* poison */
			:host([poison]) #poison {
				display: block;
			}

			/* terror */
			:host([terror]) #terror {
				display: block;
			}

			:is(:host([terror="1"]), :host([terror="2"]), :host([terror="3"]),
					:host([terror="4"]), :host([terror="5"]), :host([terror="6"])) #terror span.tier-1 {
				display: inline;
			}

			:is(:host([terror="7"]), :host([terror="8"]),
					:host([terror="9"]), :host([terror="10"])) #terror span.tier-2 {
				display: inline;
			}

			/* frailty */
			:host([frailty]) #frailty {
				display: block;
			}
		</style>

		<section id="statuses">
			<p id="burn">
				<strong>Burn Tags<count-span id="burn-count"></count-span></strong> causes
				<span class="tier-1">1</span>
				<span class="tier-2">3</span>
				<span class="tier-3">5</span>
				burn damage at the start of round.
				<button class="clear" data-tag="burn">clear</button>
			</p>
			<p id="chill">
				<strong>Chill Tags<count-span id="chill-count"></count-span></strong> cause
				<span class="tier-1">2x</span>
				<span class="tier-2">3x</span>
				<span class="tier-3">4x</span>
				damage when an incoming attack has two or more dice with the same face value (not including karma dice).
				<button class="clear" data-tag="chill">clear</button>
			</p>
			<p id="poison">
				<strong>Poison Tags<count-span id="poison-count"></count-span></strong> causes
				1 damage per tag at the start of the round.
				<button class="clear" data-tag="poison">clear</button>
			</p>
			<p id="terror">
				<strong>Terror Tags<count-span id="terror-count"></count-span></strong> cause misses when rolling
				<span class="tier-1">1s</span>
				<span class="tier-2">1s or 2s</span>
				for attacks (not including karma dice).
				<button class="clear" data-tag="terror">clear</button>
			</p>
			<p id="frailty">
				<strong>Frailty Tags<count-span id="frailty-count"></count-span></strong> cause  defense to go down 1-per tag,
				and attacks / abilities deal 2 less physical damage for each tag.
				<button class="clear" data-tag="frailty">clear</button>
			</p>
		</section>
	</template>

	<!-- when status attributes update, update the count element -->
	<script td-method="attributeChangedCallback">
		const [name, oldValue, newValue] = arguments;
		this.shadowRoot.querySelector(\`#\${name}-count\`).setAttribute('count', newValue)
	</script>

	<!-- add event listeners and triggers for the clear buttons -->
	<script td-method="connectedCallback">
		this.shadowRoot.querySelectorAll('.clear').forEach((clearButton) => {
			clearButton.addEventListener('click', () => {
				this.dispatchEvent(
					new CustomEvent("clear", {
						bubbles: true,
						detail: { tag: clearButton.getAttribute('data-tag') },
					}),
				);
			})
		})
	</script>
</ink-status-description>
`)

	TramDeco.processTemplate(importTemplate);
})()
