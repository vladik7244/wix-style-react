# Contributing

You are more than welcome to contribute by creating pull-requests.

See [Badge](https://github.com/wix/wix-style-react/blob/master/src/Badge/Badge.js) component for reference

### UX

For any questions regarding product design/UX please contact [Ben Benhorin](https://wix.slack.com/messages/@benb).

### Components design (in progress)

* This library is using es6 + jsx
* All assets are in `src/assets` folder
* Each component must have e2e & unit test as well as testkit provided. (It is recommened to make your testkits API the same across all testkit types)
* One React component per file
* Most of the components needs be a [controlled components](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/), if you still think that a component should be uncontrolled after you read the article you are welcome to push a pr for it.
* Components needs to support rtl and ltr props

### Adding new component

* If no one is working on the new component and no issue exists, create a new issue for your component and assign it to yourself;
* Stick to the UX design that is specified in the [Zeplin](https://app.zeplin.io/project/5864e02695b5754a69f56150).
* Add the component docs to [stories](https://github.com/wix/wix-style-react/tree/master/stories)

    > refer to [Badge docs](https://github.com/wix/wix-style-react/blob/master/stories/Badge/index.js) for example.

    * A story consists of properties, usage examples and code examples, 
    * use [`AutoDocs`](https://wix.github.io/wix-style-react/?selectedKind=Introduction&selectedStory=AutoDocs&full=0&down=0&left=1&panelRight=0) to automatically generate table of props,
    * Make sure to add your component to [Storybook config](https://github.com/wix/wix-style-react/blob/master/.storybook/config.js)
* Add component test, e2e and drivers to the component's folder.
* Add index.js file to the component's folder and export your component.
* Export your testkitFactory from the following files:
    * `wix-style-react/testkit/index.js`
    * `wix-style-react/testkit/enzyme.js`
    * `wix-style-react/testkit/protractor.js`

* Each component in the library extends WixComponent, so please do it with you component as well.

