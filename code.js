//Font style constants
const WEB_SMALL = "S:ee895ec978f925d906ebf5a8d3c4aec40817edcd,103:1";
const WEB_MEDIUM = "S:237497a4fee5126f04c9af39b149e47fa9be5b5e,103:8";
const WEB_LARGE = "S:afd7691e371b665f6f378dea9ada5f41a4fefe97,103:14";
const WEB_XLARGE = "S:2e783735292f86cab0ab61234f1ddd6f5e463e9c,103:20";
const WEB_XXLARGE = "S:95bfff3ebe073e91b2033f2c529b3bc3a5e7ff06,103:26";
const WEB_XXXLARGE = "S:95e94ac41a8cc79d097111a8785d3b5976c70f99,103:32";
const WEB_SMALL_BOLD = "S:15ce13c4dcfccb7435f745db419a40a8e3c680a1,103:3";
const WEB_MEDIUM_BOLD = "S:3f930c4286ca081ba58d3b9311fda7f445dd71b8,103:79";
const WEB_LARGE_BOLD = "S:f358d7568e840b9656f2d98d8e9c02a4968c1a31,103:16";
const WEB_XLARGE_BOLD = "S:7babfde548b9e87940cf2503ee352c52f308ff9a,103:22";
const WEB_XXLARGE_BOLD = "S:acd3a5e9acb9ecd650ecca5c977486d435c3f686,103:28";
const WEB_XXXLARGE_BOLD = "S:3a907a5ec9a9bccbada362c1a053cbfa8a301791,103:34";
const IOS_SMALL = "S:2629d79d087fbe03434d7ae180456796d6e1a3d2,188:312";
const IOS_MEDIUM = "S:ccbd2b00d262f548276bd22147bed1596dd6771f,188:307";
const IOS_LARGE = "S:376bf391eb763ee87b3906f26b3a0c3dfca0ddd0,188:315";
const IOS_XLARGE = "S:0250ab0a8a13ce37a6bad51be9d753b9dfdf4787,188:308";
const IOS_XXLARGE = "S:5020a1bdf48137ba69a21134c8445e7832d65ea9,188:306";
const IOS_XXXLARGE = "S:e867cd04887e0e54b3c9eade9fd7e40e61ffda12,188:309";
const IOS_SMALL_BOLD = "S:6ffc4cd6b84a26e25e6da606f5a5416b8b80beda,222:116";
const IOS_MEDIUM_BOLD = "S:c693f2b16ad2727b668773ed6866529e856bb182,222:111";
const IOS_LARGE_BOLD = "S:e9fb8165d42eae073e850d8005e20472a1295c26,222:118";
const IOS_XLARGE_BOLD = "S:a9b69053199d2b0f3c60bf047e2eea68e44bfc0d,222:112";
const IOS_XXLARGE_BOLD = "S:de4407ec3146bf25cd0f7fb9fe69640346835865,222:110";
const IOS_XXXLARGE_BOLD = "S:0519019a6f20964f4e54887d5b25cdb23708d22f,222:113";
const ANDROID_SMALL = "S:a443183c311be9703438ca0b8efb595d9f319aa4,2:30";
const ANDROID_MEDIUM = "S:6b39bd500cc5c71f5dac4b3b56f74e924d582e39,2:26";
const ANDROID_LARGE = "S:4a64c8033dcc608fe9c88cb0850d0129eb866bc5,2:24";
const ANDROID_XLARGE = "S:49a2ca0d4065198f32051c3f2d897cbfb4e15cee,2:38";
const ANDROID_XXLARGE = "S:56303f2b9aeafbbd72c84c2d5614010157e34abb,2:37";
const ANDROID_XXXLARGE = "S:eeb79754f104dec940500a208f02d7e5b60cc204,2:36";
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains
// a full browser environment (see documentation).
let selectionSet = figma.currentPage.selection;
selectionSet.forEach(selection => {
    //If selection is a component instance...
    if (selection.type == "INSTANCE") {
        //Find all its text layer children...
        let textNodes = selection.findAll(node => node.type == "TEXT");
        //...and for each one...
        textNodes.forEach(textNode => {
            switch (textNode.textStyleId) {
                //--Regular Styles--//
                //...if it is 'Small/Default' Garden style, or equivalent...
                case WEB_SMALL:
                case ANDROID_SMALL:
                case IOS_SMALL:
                    if (figma.command == "ios") {
                        //...swap to 'Caption 1'.
                        textNode.textStyleId = IOS_SMALL;
                    }
                    else if (figma.command == "android") {
                        //...swap to 'Caption'.
                        textNode.textStyleId = ANDROID_SMALL;
                    }
                    else if (figma.command == "web") {
                        //...swap to 'Small/Default'.
                        textNode.textStyleId = WEB_SMALL;
                    }
                    break;
                //...if it is 'Medium/Default' Garden style, or equivalent...
                case WEB_MEDIUM:
                case ANDROID_MEDIUM:
                case IOS_MEDIUM:
                    if (figma.command == "ios") {
                        //...swap to 'Subhead'.
                        textNode.textStyleId = IOS_MEDIUM;
                    }
                    else if (figma.command == "android") {
                        //...swap to 'Body 2'.
                        textNode.textStyleId = ANDROID_MEDIUM;
                    }
                    else if (figma.command == "web") {
                        //...swap to 'Medium/Default'.
                        textNode.textStyleId = WEB_MEDIUM;
                    }
                    break;
                //...if it is 'Large/Default' Garden style, or equivalent...
                case WEB_LARGE:
                case ANDROID_LARGE:
                case IOS_LARGE:
                    if (figma.command == "ios") {
                        //...swap to 'Body'.
                        textNode.textStyleId = IOS_LARGE;
                    }
                    else if (figma.command == "android") {
                        //...swap to 'Body 1'.
                        textNode.textStyleId = ANDROID_LARGE;
                    }
                    else if (figma.command == "web") {
                        //...swap to 'Large/Default'.
                        textNode.textStyleId = WEB_LARGE;
                    }
                    break;
                //...if it is 'XLarge/Default' Garden style, or equivalent...
                case WEB_XLARGE:
                case ANDROID_XLARGE:
                case IOS_XLARGE:
                    if (figma.command == "ios") {
                        //...swap to 'Title 2'.
                        textNode.textStyleId = IOS_XLARGE;
                    }
                    else if (figma.command == "android") {
                        //...swap to 'Headline 6'.
                        textNode.textStyleId = ANDROID_XLARGE;
                    }
                    else if (figma.command == "web") {
                        //...swap to 'XLarge/Default'.
                        textNode.textStyleId = WEB_XLARGE;
                    }
                    break;
                //...if it is 'XXLarge/Default' Garden style, or equivalent...
                case WEB_XXLARGE:
                case ANDROID_XXLARGE:
                case IOS_XXLARGE:
                    if (figma.command == "ios") {
                        //...swap to 'Title 1'.
                        textNode.textStyleId = IOS_XXLARGE;
                    }
                    else if (figma.command == "android") {
                        //...swap to 'Headline 5'.
                        textNode.textStyleId = ANDROID_XXLARGE;
                    }
                    else if (figma.command == "web") {
                        //...swap to 'XXLarge/Default'.
                        textNode.textStyleId = WEB_XXLARGE;
                    }
                    break;
                //...if it is 'XXXLarge/Default' Garden style, or equivalent...
                case WEB_XXXLARGE:
                case ANDROID_XXXLARGE:
                case IOS_XXXLARGE:
                    if (figma.command == "ios") {
                        //...swap to 'Large Title'.
                        textNode.textStyleId = IOS_XXXLARGE;
                    }
                    else if (figma.command == "android") {
                        //...swap to 'Headline 4'.
                        textNode.textStyleId = ANDROID_XXXLARGE;
                    }
                    else if (figma.command == "web") {
                        //...swap to 'XXXLarge/Default'.
                        textNode.textStyleId = WEB_XXXLARGE;
                    }
                    break;
                //--Bold Styles--//
                //...if it is 'Small/Bold' Garden style, or equivalent...
                case WEB_SMALL_BOLD:
                case ANDROID_SMALL:
                case IOS_SMALL_BOLD:
                    if (figma.command == "ios") {
                        //...swap to 'Caption 1'.
                        textNode.textStyleId = IOS_SMALL_BOLD;
                    }
                    else if (figma.command == "android") {
                        //...swap to '_'.
                        textNode.textStyleId = ANDROID_SMALL;
                        //TODO: Make bold
                    }
                    else if (figma.command == "web") {
                        //...swap to 'Small/Bold'.
                        textNode.textStyleId = WEB_SMALL_BOLD;
                    }
                    break;
                //...if it is 'Medium/Bold' Garden style, or equivalent...
                case WEB_MEDIUM_BOLD:
                case ANDROID_MEDIUM:
                case IOS_MEDIUM_BOLD:
                    if (figma.command == "ios") {
                        //...swap to 'Subhead'.
                        textNode.textStyleId = IOS_MEDIUM_BOLD;
                    }
                    else if (figma.command == "android") {
                        //...swap to '_'.
                        textNode.textStyleId = ANDROID_MEDIUM;
                        //TODO: Make bold
                    }
                    else if (figma.command == "web") {
                        //...swap to 'Medium/Bold'.
                        textNode.textStyleId = WEB_MEDIUM_BOLD;
                    }
                    break;
                //...if it is 'Large/Bold' Garden style, or equivalent...
                case WEB_LARGE_BOLD:
                case ANDROID_LARGE:
                case IOS_LARGE_BOLD:
                    if (figma.command == "ios") {
                        //...swap to 'Body'.
                        textNode.textStyleId = IOS_LARGE_BOLD;
                    }
                    else if (figma.command == "android") {
                        //...swap to '_'.
                        textNode.textStyleId = ANDROID_LARGE;
                        //TODO: Make bold
                    }
                    else if (figma.command == "web") {
                        //...swap to 'Large/Bold'.
                        textNode.textStyleId = WEB_LARGE_BOLD;
                    }
                    break;
                //...if it is 'XLarge/Bold' Garden style, or equivalent...
                case WEB_XLARGE_BOLD:
                case ANDROID_XLARGE:
                case IOS_XLARGE_BOLD:
                    if (figma.command == "ios") {
                        //...swap to 'Title 2'.
                        textNode.textStyleId = IOS_XLARGE_BOLD;
                    }
                    else if (figma.command == "android") {
                        //...swap to '_'.
                        textNode.textStyleId = ANDROID_XLARGE;
                        //TODO: Make bold
                    }
                    else if (figma.command == "web") {
                        //...swap to 'XLarge/Bold'.
                        textNode.textStyleId = WEB_XLARGE_BOLD;
                    }
                    break;
                //...if it is 'XXLarge/Bold' Garden style, or equivalent...
                case WEB_XXLARGE_BOLD:
                case ANDROID_XXLARGE:
                case IOS_XXLARGE_BOLD:
                    if (figma.command == "ios") {
                        //...swap to 'Title 1'.
                        textNode.textStyleId = IOS_XXLARGE_BOLD;
                    }
                    else if (figma.command == "android") {
                        //...swap to '_'.
                        textNode.textStyleId = ANDROID_XXLARGE;
                        //TODO: Make bold
                    }
                    else if (figma.command == "web") {
                        //...swap to 'XXLarge/Bold'.
                        textNode.textStyleId = WEB_XXLARGE_BOLD;
                    }
                    break;
                //...if it is 'XXXLarge/Bold' Garden style, or equivalent...
                case WEB_XXXLARGE_BOLD:
                case ANDROID_XXXLARGE:
                case IOS_XXXLARGE_BOLD:
                    if (figma.command == "ios") {
                        //...swap to 'Large Title'.
                        textNode.textStyleId = IOS_XXXLARGE_BOLD;
                    }
                    else if (figma.command == "android") {
                        //...swap to '_'.
                        textNode.textStyleId = ANDROID_XXXLARGE;
                        //TODO: Make bold
                    }
                    else if (figma.command == "web") {
                        //...swap to 'XXXLarge/Bold'.
                        textNode.textStyleId = WEB_XXXLARGE_BOLD;
                    }
                    break;
            }
        });
    }
});
// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
figma.closePlugin();
