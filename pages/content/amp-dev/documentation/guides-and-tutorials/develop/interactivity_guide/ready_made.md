---
formats:
  - websites
$title: Ready-made interactivity with AMP components
$order: 2
description: "Read this guide to learn how to build interactivity in AMP."
author: CrystalOnScript
contributors:
  - sbenz
---

This guide outlines interactive possibilities available in the  [AMP component library](../../../components/index.html). The library provides ready-made elements that meet common and uncommon user interface needs. You are able to customize these components, and how they interact with users, to meet specific needs. Read-on to learn how to harness this to decrease initial build costs without losing adaptability. 


# Ready-made interactive components

Many of the available components fulfill a single purpose of interactivity. Most can standalone, but a core principle of AMP is composability. Composability allows you to combine different AMP components together to implement a customized interaction. Most allow templating with [amp-mustache](https://amp.dev/documentation/components/amp-mustache/).

AMP offers the following ready-made interactive components:



*   [**amp-accordion**](../../../components/reference/amp-accordion.md): a stacked list of headers that collapse or expand content sections with user interaction.
*   [**amp-autocomplete**](../../..//components/reference/amp-autocomplete.md): suggests completed results corresponding to the user input as they type. 
*   [**amp-base-carousel**](../../../components/reference/amp-base-carousel.md): displays multiple similar pieces of content along a horizontal axis or vertical axis.
*   [**amp-carousel**](../../../components/reference/amp-carousel.md): displays multiple pieces of content along a horizontal axis that users can tap through. 
*   [**amp-consent**](../../../components/reference/amp-consent.md): a UI control that collects and stores a user’s consent. Can block other AMP components based on user consent. 
*   [**amp-date-picker**](../../../components/reference/amp-date-picker.md): a widget to select dates.
*   [**amp-form**](../../../components/reference/amp-form.md): creates forms, but with AMP powers.  
*   [**amp-lightbox-gallery**](../../../components/reference/amp-lightbox-gallery.md): displays images in a lightbox gallery. 
*   [**amp-inline-gallery**](../../../components/reference/amp-inline-gallery.md): displays multiple images along a horizontal axis that users can tap through. 
*   [**amp-inputmask**](../../../components/reference/amp-inputmask.md): provides input masking capabilities to inputs in AMP forms.
*   [**amp-lightbox**](../../../components/reference/amp-lightbox.md): displays elements in a full-viewport “lightbox” modal. 
*   [**amp-mega-menu**](../../../components/reference/amp-mega-menu.md): Displays top-level navigational content inside expandable containers.
*   [**amp-nested-menu**](../../../components/reference/amp-nested-menu.md): Displays a drilldown menu with arbitrary levels of nested submenus.
*   [**amp-recaptcha-input**](../../../components/reference/amp-recaptcha-input.md): appends a reCAPTCHA v3 token to AMP form submissions.
*   [**amp-sidebar**](../../../components/reference/amp-sidebar.md)
*   [**amp-user-notification**](../../../components/reference/amp-user-notification.md): Displays a dismissable notification to the user.


# Implementation patterns

Using an AMP component may be as easy copy and pasting the sample code! If not, are are able to specify functionality. Each component’s reference documentation outlines behavior and styling customization. 

If you are unable to find a ready-made solution, think about how you could achieve the desired behavior by combining existing components. Combine multiple components or other HTML elements to create new ones! The AMP team is constantly surprised with the creative solutions developers have composed, some are featured in our [example](https://amp.dev/documentation/examples/?format=websites)s (and if you create something cool we encourage you to [contribute it](https://github.com/ampproject/amp.dev/blob/future/contributing/samples.md)!). It’s impossible to document all the ways to combine AMP components, but this section outlines some best practices.


## Customize behavior with attributes

By using [common AMP attributes](https://amp.dev/documentation/guides-and-tutorials/learn/common_attributes/) and element-specific attributes you can customize and combine components to fit your needs. Read the reference documentation to learn its specific attributes.


### Small behavior change

Some attributes will change a small behavior. In the example below, the `[amp-accordion](https://amp.dev/documentation/components/amp-accordion/?format=websites)` includes the `[animate](https://amp.dev/documentation/components/amp-accordion/?format=websites#animate)` attribute. This attribute adds a slight "roll down" animation to the expansion and collapse of each section when the user interacts with it.


```
 <section>
    <h2>Section 1</h2>
    <p>Content in section 1.</p>
  </section>
  <section>
    <h2>Section 2</h2>
    <div>Content in section 2.</div>
  </section>
  <section>
    <h2>Section 3</h2>
    <amp-img
      src="/static/inline-examples/images/squirrel.jpg"
      width="320"
      height="256"
    ></amp-img>
  </section>
</amp-accordion>
```





## Combination and composition

Combine AMP components with other AMP components orHTML elements to  interactivity and user experiences. For example, combine `amp-form` and `amp-date-picker for creating a booking flow`. 


```
<form method="post" action-xhr="/documentation/examples/api/submit-form-xhr" target="_top">
<amp-date-picker id="form-picker" type="single" mode="static" layout="fixed-height" height="360" format="YYYY-MM-DD">
</amp-date-picker>
<input type="submit">
</form>
```


There is no limit on the number of components you may combine. The example below builds on the previous one. We’ve added [amp-inputmask](https://amp.dev/documentation/components/amp-inputmask/?format=websites) to communicate the type of input accepted from a user and [amp-mustache](https://amp.dev/documentation/components/amp-mustache/?format=websites) to relay a success message. 


```html
<form class="sample-form" method="post" action-xhr="/documentation/examples/api/postal" target="_top">
<amp-date-picker id="form-picker" type="single" mode="static" layout="fixed-height" height="360" format="YYYY-MM-DD">
</amp-date-picker>
<label>Phone: <input name="code" type="tel" mask="+\1_(000)_000-0000" placeholder="+1 (555) 555-5555" mask-output="alphanumeric"></label>
<input type="submit">
<div submit-success>
    <template type="amp-mustache">
    <p>The raw value: {% raw %}{{code}}{% endraw %}</p>
    <p>The unmasked value: {% raw %}{{code-unmasked}}{% endraw %}</p>
    </template>
</div>
</form>
```


The components listed at the beginning of the guides are a great way to get started with AMP. Familiarizing with these helps you get an overview of the different building blocks AMP provides.


## Actions and events

As outlined in [Basic interactivity](https://docs.google.com/document/d/1Vr7WSAu4-nGP3x7mC16xYOhuZeXZ3Kz4JtLmoFL9dnw/edit?ts=5e6b4238#heading=h.x1yh0ixnavmx), AMP exposes globally available actions and events. Many of AMP’s components have their own component specific actions and events, made available by use of that component. [AMP’s action and event system](https://amp.dev/documentation/guides-and-tutorials/learn/amp-actions-and-events/) is a powerful way to implement more complex interaction patterns. In the example below we open a lightbox on a successful form submission.


```
 <form 
        on="submit-success:amp-lightbox-gallery.open(id='squirrel')" 
        method="post" action-xhr="/documentation/examples/api/postal" target="_top">
    <label>Postal code: <input name="code" mask="L0L_0L0" placeholder="A1A 1A1"></label>
    <input type="submit">
    <div submit-success>
  <amp-img
           src="/static/inline-examples/images/squirrel.jpg"
           width="320"
           height="256"
           lightbox
           id="squirrel"
           ></amp-img>
    </div>
  </form>
```


Check out the actions and events overview page to learn more about the different kinds of actions and events available in AMP.


### Define reusable actions

If you are chaining multiple actions, you can define them together as a single and reusable action. Use the [amp-action-macro](https://amp.dev/documentation/components/amp-action-macro/?format=websites) component to create AMP action macros. Each action macro needs an id and an action to execute. Call the action macro by it’s id and pass the arguments that alter its behavior. 


```
  id="closeNavigations"
  execute="AMP.setState({nav1: 'close', nav2: 'close})"
></amp-action-macro>
<button on="tap:closeNavigations.execute()">Close all</button>
<div on="tap:closeNavigations.execute()">Close all</div>
<!--
  You can provide arguments in the macro.
-->
<amp-carousel id="carousel" ...>...</amp-carousel>

<amp-action-macro
  id="carousel-macro"
  execute="carousel.goToSlide(index=foo), carousel.goToSlide(index=bar)"
  arguments="foo, bar"
></amp-action-macro>
<button on="tap:carousel-macro.execute(foo=1, bar=2)">
  Go to slide 1 then 2
</button>

```



# Customization continued

This guide has just a few examples of the ways you can use ready-made components to build interactivity. If you have a need for a ready-made component that is not listed, you may file a [feature request](https://github.com/ampproject/amphtml/issues/new?assignees=&labels=Type%3A+Feature+Request&template=feature_request.md&title=) or declare an [intent to implement](https://github.com/ampproject/amphtml/issues/new?assignees=&labels=INTENT+TO+IMPLEMENT&template=intent-to-implement--i2i-.md&title=I2I%3A+%3Cyour+feature%2Fchange%3E) and [contribute](https://amp.dev/documentation/guides-and-tutorials/contribute/) it yourself. Otherwise, check out [Building custom interactive experiences](https://docs.google.com/document/d/1zoGlz6hq9nnbo_uKgfwueZN42qwzgXNDQvrGWTYwzvs/edit#heading=h.i3b745ftm2e5) for highly customized integration options in AMP. 