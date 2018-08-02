# ep_themes_ext

An Etherpad Lite plugin that allows you to load external CSS stylesheets to change the layout.

# Requirements

Requires EP version > 1.5.7 that is ``aceEditorCSS`` hook [patch](https://github.com/tiblu/etherpad-lite/commit/ad2ea924b5c039ebb8df9dd97d1f5ecaeb02fb14) to be merged with Etherpad

# Install

``npm install ep_themes_ext``

# Configuration

In your EP ``settings.json`` add:

```
  "ep_themes_ext": {
    "default": ["https://myhost.com/static/styles/default.css"],
    "theme1": ["https://myhost.com/static/styles/theme1.css", "https://myhost.com/static/styles/theme1_extras.css"]
  }
```

When embedding EP, use ``theme`` parameter to choose the theme. For example ``https://myetherpadinstallion.com/p/testpad?theme=theme1``. Read more about embedding Etherpad - http://etherpad.org/doc/v1.5.7/#index_embed_parameters.

**NOTES:**

* The ``default`` can be an empty array, then the plugin does nothing.
* The ``default`` theme is used when no ``theme`` embed parameter is provided. 


# Credits

* [CitizenOS](https://citizenos.com) for funding the development 
* Implementation inspired by [https://github.com/JohnMcLear/ep_themes](https://github.com/JohnMcLear/ep_themes) - if you just want color scheme changes, use that instead.


# TODO

* We could inject the styles on ``eejsBlock_styles`` event ([http://etherpad.org/doc/v1.5.7/#index_eejsblock_name](http://etherpad.org/doc/v1.5.7/#index_eejsblock_name))? This would make the loads 100% without style flicker. **BUT** how would we get the embed request parameters at this point? If we can make it, then we should call ``eejsBlock_styles`` from all templates and use that single event to add styles. Would there be other issues?