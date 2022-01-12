//Font style key constants
const WEB_SMALL = "ee895ec978f925d906ebf5a8d3c4aec40817edcd"
const WEB_MEDIUM = "237497a4fee5126f04c9af39b149e47fa9be5b5e"
const WEB_LARGE = "afd7691e371b665f6f378dea9ada5f41a4fefe97"
const WEB_XLARGE = "2e783735292f86cab0ab61234f1ddd6f5e463e9c"
const WEB_XXLARGE = "95bfff3ebe073e91b2033f2c529b3bc3a5e7ff06"
const WEB_XXXLARGE = "95e94ac41a8cc79d097111a8785d3b5976c70f99"
const WEB_SMALL_BOLD = "15ce13c4dcfccb7435f745db419a40a8e3c680a1"
const WEB_MEDIUM_BOLD = "3f930c4286ca081ba58d3b9311fda7f445dd71b8"
const WEB_LARGE_BOLD = "f358d7568e840b9656f2d98d8e9c02a4968c1a31"
const WEB_XLARGE_BOLD = "7babfde548b9e87940cf2503ee352c52f308ff9a"
const WEB_XXLARGE_BOLD = "acd3a5e9acb9ecd650ecca5c977486d435c3f686"
const WEB_XXXLARGE_BOLD = "3a907a5ec9a9bccbada362c1a053cbfa8a301791"
const IOS_SMALL = "2629d79d087fbe03434d7ae180456796d6e1a3d2" //Caption 1
const IOS_MEDIUM = "ccbd2b00d262f548276bd22147bed1596dd6771f" //Subhead
const IOS_LARGE = "376bf391eb763ee87b3906f26b3a0c3dfca0ddd0" //Body
const IOS_XLARGE = "0250ab0a8a13ce37a6bad51be9d753b9dfdf4787" //Title 2
const IOS_XXLARGE = "5020a1bdf48137ba69a21134c8445e7832d65ea9" //Title 1
const IOS_XXXLARGE = "e867cd04887e0e54b3c9eade9fd7e40e61ffda12" //Large Title
const IOS_SMALL_BOLD = "6ffc4cd6b84a26e25e6da606f5a5416b8b80beda"
const IOS_MEDIUM_BOLD = "c693f2b16ad2727b668773ed6866529e856bb182" 
const IOS_LARGE_BOLD = "e9fb8165d42eae073e850d8005e20472a1295c26"
const IOS_XLARGE_BOLD = "a9b69053199d2b0f3c60bf047e2eea68e44bfc0d"
const IOS_XXLARGE_BOLD = "de4407ec3146bf25cd0f7fb9fe69640346835865"
const IOS_XXXLARGE_BOLD = "0519019a6f20964f4e54887d5b25cdb23708d22f"
const ANDROID_SMALL = "a443183c311be9703438ca0b8efb595d9f319aa4" //Caption
const ANDROID_MEDIUM = "6b39bd500cc5c71f5dac4b3b56f74e924d582e39" //Body 2
const ANDROID_LARGE = "4a64c8033dcc608fe9c88cb0850d0129eb866bc5" //Body 1
const ANDROID_XLARGE = "49a2ca0d4065198f32051c3f2d897cbfb4e15cee" //Headline 6
const ANDROID_XXLARGE = "56303f2b9aeafbbd72c84c2d5614010157e34abb" //Headline 5
const ANDROID_XXXLARGE = "eeb79754f104dec940500a208f02d7e5b60cc204" //Headline 4

//Component Key Constants
const WEB_HEADER = "da85778fa3e3f54485fcedfe1bf2476f851f2f41"
const WEB_HEADER_DESC = "11a70aadce0c7f1ff36a5ca3b7fd41ca54782e5f"
const WEB_HEADER_AVATAR = "7d42432a3d8806fafe8c1f11af6d2f7e87771927"
const WEB_HEADER_ALL = "ea7ad08e03a4255ecf0cf75664ebc7ad0283f7d5"
const IOS_HEADER = "a7c6154ff6b6c4753d96be042b84e00669aa2d4e"
const IOS_HEADER_DESC = "bbe64c12fff9dc0a51e6df8282775f5c8ad1d077"
const IOS_HEADER_AVATAR = "2ca9a35975055ed0f569bdd56f6aa27c0701839a"
const IOS_HEADER_ALL = "6689ddbaea94cdce8c2d1f564fefabf2f7f6db98"
const IOS_HOME_INDICATOR = "6c37541b3ea809b094592016b8eb1bcbc1b57a2c"
const ANDROID_HEADER = "75a226acf592f706a101b29a8721a82c0b2a5992"
const ANDROID_HEADER_DESC = "dae949dbbdb3d7f91b54ed2acd34dbdfdbe66d47"
const ANDROID_HEADER_AVATAR = "12e8d41fa49cc8e7635b7628edde480ce2cff2a4"
const ANDROID_HEADER_ALL = "6487e64f62e0a21701c5e5f1dd206b6a879c28e1"

run()

async function run() {
  await swap().then(() => { figma.closePlugin() })
}

async function swap() {
  let selectionSet = figma.currentPage.selection
  await Promise.all(selectionSet.map(async selection => {
    switch (selection.type) {
      //If selection is a component instance, group or frame...
      case "INSTANCE":
      case "FRAME":
      case "GROUP":
        //Find all its text layer children...
        let textNodes: TextNode[] = selection.findAll(node => node.type == "TEXT") as TextNode[]
        //...and for each one...
        await Promise.all(textNodes.map(async textNode => {
          await swapText(textNode)
        }))

        //Find all its instance layer children, and include itself, if a instance...
        let instanceNodes: InstanceNode[] = selection.findAll(node => node.type == "INSTANCE") as InstanceNode[]
        if (selection.type == "INSTANCE") {
          instanceNodes.push(selection)
        }
        //...and for each...
        await Promise.all(instanceNodes.map(async instanceNode => {
          if (instanceNode.mainComponent.parent && instanceNode.mainComponent.parent.name == "Header") {
            await swapHeaders(instanceNode)
          }
        }))
        //Set relaunch buttons.
        //Todo: This should be moved, so as to account for setting/resetting children (some of which might already have a button) too.
        switch (figma.command) {
          case "android":
            selection.setRelaunchData({ios: "", web: ""})
            break;
          case "ios":
            selection.setRelaunchData({android: "", web: ""})
            break;
          case "web":
            selection.setRelaunchData({android: "", ios: ""})
            break;
        }

        //If the frame is named "Messenger" resize and add/remove an iOS home indicator.
        //Todo: This should be moved, so as to find "Messenger"s among the children too.
        if (selection.type == "FRAME" && selection.name == "Messenger") {
          switch (figma.command) {
            case "android":
              selection.resize(360, 640)
              break;
            case "ios":
              selection.resize(375, 812)
              break;
            case "web":
              selection.resize(380, 700)
              break;
          }

          let home = selection.findChild(node => node.name == "Home Indicator" && node.type == "INSTANCE") as InstanceNode
          switch (figma.command) {
            case "android":
            case "web":
              if (home) {
                home.visible = false
              }
              break;
            case "ios":
              if (!home) {
                home = (await figma.importComponentByKeyAsync(IOS_HOME_INDICATOR)).createInstance()
                home.layoutAlign = "STRETCH"
                selection.appendChild(home)
              } else if (!home.visible) {
                home.visible = true
              }
              break;
          }
        }
        break
      //If selection is a text layer...
      case "TEXT":
        //...just switch it...
        await swapText(selection)
        break
    }
  }))

  async function swapText(textNode: TextNode) {
    let style = figma.getStyleById(textNode.textStyleId as string)
    try {
      switch (style.key) {
        //--Regular Styles--//
        //...if it is 'Small/Default' Garden style, or equivalent...
        case WEB_SMALL:
        case ANDROID_SMALL:
        case IOS_SMALL:
          if (figma.command == "ios") {
            //...swap to 'Caption 1'.
            await swapStyle(IOS_SMALL)
          } else if (figma.command == "android") {
            //...swap to 'Caption'.
            await swapStyle(ANDROID_SMALL)
          } else if (figma.command == "web") {
            //...swap to 'Small/Default'.
            await swapStyle(WEB_SMALL)
          }
          break
        //...if it is 'Medium/Default' Garden style, or equivalent...
        case WEB_MEDIUM:
        case ANDROID_MEDIUM:
        case IOS_MEDIUM:
          if (figma.command == "ios") {
            //...swap to 'Subhead'.
            await swapStyle(IOS_MEDIUM)
          } else if (figma.command == "android") {
            //...swap to 'Body 2'.
            await swapStyle(ANDROID_MEDIUM)
          } else if (figma.command == "web") {
            //...swap to 'Medium/Default'.
            await swapStyle(WEB_MEDIUM)
          }
          break
        //...if it is 'Large/Default' Garden style, or equivalent...
        case WEB_LARGE:
        case ANDROID_LARGE:
        case IOS_LARGE:
          if (figma.command == "ios") {
            //...swap to 'Body'.
            await swapStyle(IOS_LARGE)
          } else if (figma.command == "android") {
            //...swap to 'Body 1'.
            await swapStyle(ANDROID_LARGE)
          } else if (figma.command == "web") {
            //...swap to 'Large/Default'.
            await swapStyle(WEB_LARGE)
          }
          break
        //...if it is 'XLarge/Default' Garden style, or equivalent...
        case WEB_XLARGE:
        case ANDROID_XLARGE:
        case IOS_XLARGE:
          if (figma.command == "ios") {
            //...swap to 'Title 2'.
            await swapStyle(IOS_XLARGE)
          } else if (figma.command == "android") {
            //...swap to 'Headline 6'.
            await swapStyle(ANDROID_XLARGE)
          } else if (figma.command == "web") {
            //...swap to 'XLarge/Default'.
            await swapStyle(WEB_XLARGE)
          }
          break
        //...if it is 'XXLarge/Default' Garden style, or equivalent...
        case WEB_XXLARGE:
        case ANDROID_XXLARGE:
        case IOS_XXLARGE:
          if (figma.command == "ios") {
            //...swap to 'Title 1'.
            await swapStyle(IOS_XXLARGE)
          } else if (figma.command == "android") {
            //...swap to 'Headline 5'.
            await swapStyle(ANDROID_XXLARGE)
          } else if (figma.command == "web") {
            //...swap to 'XXLarge/Default'.
            await swapStyle(WEB_XXLARGE)
          }
          break
        //...if it is 'XXXLarge/Default' Garden style, or equivalent...
        case WEB_XXXLARGE:
        case ANDROID_XXXLARGE:
        case IOS_XXXLARGE:
          if (figma.command == "ios") {
            //...swap to 'Large Title'.
            await swapStyle(IOS_XXXLARGE)
          } else if (figma.command == "android") {
            //...swap to 'Headline 4'.
            await swapStyle(ANDROID_XXXLARGE)
          } else if (figma.command == "web") {
            //...swap to 'XXXLarge/Default'.
            await swapStyle(WEB_XXXLARGE)
          }
          break
        //--Bold Styles--//
        //...if it is 'Small/Bold' Garden style, or equivalent...
        //TODO Need to account for android styles that have been bolded
        case WEB_SMALL_BOLD:
        case IOS_SMALL_BOLD:
          if (figma.command == "ios") {
            //...swap to 'Caption 1'.
            await swapStyle(IOS_SMALL_BOLD)
          } else if (figma.command == "android") {
            //...swap to '_'.
            await swapStyle(ANDROID_SMALL)
            //TODO: Make bold
          } else if (figma.command == "web") {
            //...swap to 'Small/Bold'.
            await swapStyle(WEB_SMALL_BOLD)
          }
          break
        //...if it is 'Medium/Bold' Garden style, or equivalent...
        case WEB_MEDIUM_BOLD:
        case IOS_MEDIUM_BOLD:
          if (figma.command == "ios") {
            //...swap to 'Subhead'.
            await swapStyle(IOS_MEDIUM_BOLD)
          } else if (figma.command == "android") {
            //...swap to '_'.
            await swapStyle(ANDROID_MEDIUM)
            //TODO: Make bold
          } else if (figma.command == "web") {
            //...swap to 'Medium/Bold'.
            await swapStyle(WEB_MEDIUM_BOLD)
          }
          break
        //...if it is 'Large/Bold' Garden style, or equivalent...
        case WEB_LARGE_BOLD:
        case IOS_LARGE_BOLD:
          if (figma.command == "ios") {
            //...swap to 'Body'.
            await swapStyle(IOS_LARGE_BOLD)
          } else if (figma.command == "android") {
            //...swap to '_'.
            await swapStyle(ANDROID_LARGE)
            //TODO: Make bold
          } else if (figma.command == "web") {
            //...swap to 'Large/Bold'.
            await swapStyle(WEB_LARGE_BOLD)
          }
          break
        //...if it is 'XLarge/Bold' Garden style, or equivalent...
        case WEB_XLARGE_BOLD:
        case IOS_XLARGE_BOLD:
          if (figma.command == "ios") {
            //...swap to 'Title 2'.
            await swapStyle(IOS_XLARGE_BOLD)
          } else if (figma.command == "android") {
            //...swap to '_'.
            await swapStyle(ANDROID_XLARGE)
            //TODO: Make bold
          } else if (figma.command == "web") {
            //...swap to 'XLarge/Bold'.
            await swapStyle(WEB_XLARGE_BOLD)
          }
          break
        //...if it is 'XXLarge/Bold' Garden style, or equivalent...
        case WEB_XXLARGE_BOLD:
        case IOS_XXLARGE_BOLD:
          if (figma.command == "ios") {
            //...swap to 'Title 1'.
            await swapStyle(IOS_XXLARGE_BOLD)
          } else if (figma.command == "android") {
            //...swap to '_'.
            await swapStyle(ANDROID_XXLARGE)
            //TODO: Make bold
          } else if (figma.command == "web") {
            //...swap to 'XXLarge/Bold'.
            await swapStyle(WEB_XXLARGE_BOLD)
          }
          break
        //...if it is 'XXXLarge/Bold' Garden style, or equivalent...
        case WEB_XXXLARGE_BOLD:
        case IOS_XXXLARGE_BOLD:
          if (figma.command == "ios") {
            //...swap to 'Large Title'.
            await swapStyle(IOS_XXXLARGE_BOLD)
          } else if (figma.command == "android") {
            //...swap to '_'.
            await swapStyle(ANDROID_XXXLARGE)
            //TODO: Make bold
          } else if (figma.command == "web") {
            //...swap to 'XXXLarge/Bold'.
            await swapStyle(WEB_XXXLARGE_BOLD)
          }
          break
      }
    } catch (error) {
      //Text may not have an external key
      console.log(error);
    }

    async function swapStyle(style: string) {
      try {
        await figma.importStyleByKeyAsync(style).then(baseStyle => { textNode.textStyleId = baseStyle.id })
      } catch (error) {
        figma.notify("Font styles are missing!")
      }
    }
  }
}

async function swapHeaders(header: InstanceNode) {
  switch(header.mainComponent.key) {
    case WEB_HEADER:
    case IOS_HEADER:
    case ANDROID_HEADER:
      if (figma.command == "ios") {
        header.swapComponent(await figma.importComponentByKeyAsync(IOS_HEADER))
      } else if (figma.command == "android") {
        header.swapComponent(await figma.importComponentByKeyAsync(ANDROID_HEADER))
      } else if (figma.command == "web") {
        header.swapComponent(await figma.importComponentByKeyAsync(WEB_HEADER))
      }
      break;
    case WEB_HEADER_DESC:
    case IOS_HEADER_DESC:
    case ANDROID_HEADER_DESC:
      if (figma.command == "ios") {
        header.swapComponent(await figma.importComponentByKeyAsync(IOS_HEADER_DESC))
      } else if (figma.command == "android") {
        header.swapComponent(await figma.importComponentByKeyAsync(ANDROID_HEADER_DESC))
      } else if (figma.command == "web") {
        header.swapComponent(await figma.importComponentByKeyAsync(WEB_HEADER_DESC))
      }
      break;
    case WEB_HEADER_AVATAR:
    case IOS_HEADER_AVATAR:
    case ANDROID_HEADER_AVATAR:
      if (figma.command == "ios") {
        header.swapComponent(await figma.importComponentByKeyAsync(IOS_HEADER_AVATAR))
      } else if (figma.command == "android") {
        header.swapComponent(await figma.importComponentByKeyAsync(ANDROID_HEADER_AVATAR))
      } else if (figma.command == "web") {
        header.swapComponent(await figma.importComponentByKeyAsync(WEB_HEADER_AVATAR))
      }
      break;
    case WEB_HEADER_ALL:
    case IOS_HEADER_ALL:
    case ANDROID_HEADER_ALL:
      if (figma.command == "ios") {
        header.swapComponent(await figma.importComponentByKeyAsync(IOS_HEADER_ALL))
      } else if (figma.command == "android") {
        header.swapComponent(await figma.importComponentByKeyAsync(ANDROID_HEADER_ALL))
      } else if (figma.command == "web") {
        header.swapComponent(await figma.importComponentByKeyAsync(WEB_HEADER_ALL))
      }
      break;
  }
}
