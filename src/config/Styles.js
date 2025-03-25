'use strict';

import {StyleSheet, Dimensions} from "react-native";
import ColorsApp from './ColorsApp';
import hexToRgba from 'hex-to-rgba';
import ConfigApp from "./ConfigApp";

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const PrimaryColor = ColorsApp.PRIMARY;

module.exports = StyleSheet.create({

//////////////////////// LOGIN/SIGNUP

AuthTitle:{
width: '100%',
maxHeight: '100%',
marginBottom: 20,
alignSelf: 'center', 
justifyContent: 'center',
alignItems: 'center',
textAlign: 'center' 
},

AuthLogo:{
width: '100%',
height: screenHeight/5,
maxHeight: '100%',
marginBottom: 50
},

AuthContent:{
marginHorizontal: 50,
},

AuthInput:{
marginBottom: 10,
backgroundColor: "transparent"
},

AuthButton:{
marginTop: 15,
borderRadius: 6,
elevation: 0
},

AuthButtonContent:{
paddingVertical: 10,
},

AuthButtonLabel:{
letterSpacing: 0,
fontWeight: 'bold',
},

AuthCheckBoxLabel:{
textTransform: 'capitalize',
marginLeft: 5,
letterSpacing: 0,
},

AuthCheckBoxContent:{
//backgroundColor: '#fff'
},

AuthBottomText:{
fontSize: 16
},

AuthBottomContent:{
marginTop: 20,
alignItems: 'center'
},

ForgotPass:{
fontSize: 16,
marginVertical: 10,
alignSelf: 'flex-end',
marginHorizontal: 4
},

textArea:{
//backgroundColor: '#fff'
},

//////////////////////// DRAWER MENU

Drawer:{
flex: 1,
paddingBottom: 30
},

DrawerHeader:{
paddingTop: screenHeight/17,
paddingBottom: screenHeight/24,
justifyContent: 'center',
alignItems: 'center'  
},

DrawerImage:{
width: '100%',
height: screenHeight/9,
maxHeight: '100%',
marginVertical: 10
},

DrawerMenuItem:{
marginHorizontal: 20,
borderRadius: 6
},

DrawerTitleMenu:{
fontSize: 16,
fontWeight: '600', 
},

DrawerIconMenu:{
fontSize: 30,
marginRight: 15,
},

DrawerIconRightMenu:{
fontSize: 25,
opacity: 0.3
},

DrawerButton:{
borderRadius: 6,
marginHorizontal: 15,
marginVertical: 10,
},

DrawerButtonLabel:{
textTransform: 'capitalize',
fontSize: 17,
},

DrawerButtonContent:{
height: 45,
width: '100%'
},

DrawerTitleHeader:{
fontWeight: 'bold',
fontSize: 20,
marginBottom: 8
},

DrawerSubTitleHeader:{
fontSize: 14,
},

DrawerFooter:{
height: screenHeight*0.10,
width: '100%',
position: 'absolute',
justifyContent: 'center',
alignContent: 'center',
alignItems: 'center',
bottom: 0
},

DrawerSearchInput:{
marginHorizontal: 15,
marginVertical: 15
},

//////////////////////// HEADING

headingTitle:{
fontSize: 18,
fontWeight: 'bold'
},

headingSubTitle:{
fontSize: 16,
},

headingButton:{

borderWidth: 2,
paddingHorizontal: 12,
paddingVertical: 5,
borderRadius: 50
},

headingButtonText:{
fontSize: 12,
fontWeight: 'bold',
textTransform: 'uppercase' 
},

//////////////////////// BUTTONS

Button1:{
alignItems: 'center',
flexDirection: 'row',
height: screenHeight*0.065,
width: '100%',
paddingHorizontal: 55,
position: 'relative',
marginTop: 10
},

Button1Text:{
fontSize: 16,
},

Button1IconLeft:{
color: PrimaryColor,
position: 'absolute',
left: 20,
fontSize: 20,
},

Button1IconRight:{
color: PrimaryColor,
position: 'absolute',
right: 15,
fontSize: 20
},

//////////////////////// PROFILE

HeaderProfile:{
width: '100%',
height: screenHeight*0.30,
alignItems: 'center',
justifyContent: 'center',
marginTop: 20
},

ImageProfile:{
borderRadius: 100,
width: screenWidth*0.28,
height: 'auto',
minHeight: screenWidth*0.28,
marginBottom: 20	
},

ButtonProfile:{
borderRadius: 60,
width: '40%',
marginHorizontal: 15,
marginTop: 20,
},

ButtonLabelProfile:{
fontWeight: 'bold',
fontSize: 16,
},

ButtonContentProfile:{
height: screenHeight*0.05,
width: '100%'
},

SubTextProfile:{
fontSize: 16,
},

SmallTextProfile:{
fontSize: 14,
marginTop:5,
opacity:0.5,
},

TextProfile:{
fontSize: 18,
marginRight: 4,
fontWeight:'bold',
marginBottom: 5
},

SignButton:{
marginHorizontal: 15,
marginVertical: 10,
},

SignButtonLabel:{
//color: '#fff',

},

SignButtonContent:{
paddingVertical: 10,
backgroundColor: PrimaryColor,
width: '100%',
},

SignButtonTextContent:{
marginVertical: 20,
fontSize: 16
},

////////////////////////////////////////////////

card1_gradient:{
position: 'absolute',
padding:15,
left: 0,
right: 0,
bottom: 0,
height: screenHeight * 0.23,
alignItems: 'flex-start',
justifyContent: 'flex-end',
borderRadius: 8
},

card1_background:{
width: screenWidth*0.75,
height: screenHeight * 0.23,
alignItems: 'flex-start',
alignSelf: 'center', 
justifyContent: 'flex-end',
padding: 15,
marginBottom: 20,
marginLeft: 25,
position:'relative'
},
card1_goal:{
  width: screenWidth*0.90,
  height: screenHeight * 0.23,
  alignItems: 'flex-start',
  alignSelf: 'center', 
  justifyContent: 'flex-end',
  padding: 15,
  marginBottom: 20,
  marginLeft: 25,
  position:'relative'
  },

card1_title:{
color: "#fff",
fontWeight: 'bold',
},
card1_title2:{
  color: "#fff",
  fontWeight: 'bold',
  fontSize:12
},
card1_title3:{
  color: "#fff",
  fontWeight: 'bold',
  fontSize:15
},
card1_title3:{
  color: "#fff",
  fontWeight: 'bold',
  fontSize:15
},
gender_T:{
marginLeft:155,
fontSize:25,
marginTop:100,
},

card1_subtitle:{
color: PrimaryColor,
fontWeight: 'bold',
},

card1_viewicon:{
backgroundColor:"rgba(0,0,0,0.3)",
borderRadius:100,
padding: 10,
position: 'absolute',
right: 10,
top: 10
},

card1_icon:{
color: PrimaryColor,
fontWeight: 'bold'
},

card2_view:{
width: screenWidth*0.23,
marginLeft: 15,
justifyContent: 'center',
alignItems: 'center'
},

card2_content:{
justifyContent: 'center',
alignItems: 'center',
},

card2_title:{
marginTop: 10,
fontSize: 15,
textAlign: 'center',
},

card3_title:{
color: '#FFF',
fontSize: 15,
fontWeight: 'bold' 
},

card3_subtitle:{
color: '#FFF',
fontSize: 14,
opacity: 0.8,
marginVertical: 6
},

card3_category:{
marginBottom: 6,
color: PrimaryColor,
fontWeight: 'bold',
fontSize: 16,
},

card3_gradient:{
position: 'absolute',
padding:15,
left: 0,
right: 0,
bottom: 0,
height: screenHeight * 0.23,
alignItems: 'flex-start',
justifyContent: 'flex-end',
borderRadius: 8
},

card3_background:{
width: screenWidth*0.9,
height: screenHeight * 0.23,
alignItems: 'flex-start',
alignSelf: 'center', 
justifyContent: 'flex-end',
padding: 15,
marginBottom: 20
},

card3_viewicon:{
flexDirection: 'row',
backgroundColor:"rgba(0,0,0,0.3)",
borderRadius:100,
padding: 10,
position: 'absolute',
left: 10,
top: 10
},

card3_rate:{
flexDirection: 'row',
padding: 10,
position: 'absolute',
right: 10,
top: 7
},

card3_icon:{
color: '#fff',
marginLeft:8,
fontSize:12
},

card4_title:{
color: '#FFF',
fontSize: 15,
fontWeight: 'bold' 
},

card4_viewicon:{
flexDirection: 'row',
backgroundColor:"rgba(0,0,0,0.3)",
borderRadius:100,
padding: 3,
paddingHorizontal:10,
marginBottom:3
},

card4_gradient:{
position: 'absolute',
padding:15,
left: 0,
right: 0,
bottom: 0,
height: screenHeight * 0.15,
alignItems: 'flex-start',
justifyContent: 'flex-end',
borderRadius: 8
},

card4_background:{
width: '100%',
height: screenHeight * 0.15,
alignItems: 'flex-start',
alignSelf: 'center', 
justifyContent: 'flex-end',
},

card5_title:{
color: '#FFF',
fontSize: 15,
fontWeight: 'bold' 
},

card5_border:{
backgroundColor:PrimaryColor,
width:25,
height:4,
marginVertical:8
},
card5_border2:{
  backgroundColor:PrimaryColor,
  width:100,
  height:4,
  marginVertical:8,
  marginVertical:10,
  marginHorizontal:10
  },

card5_gradient:{
position: 'absolute',
padding:15,
left: 0,
right: 0,
bottom: 0,
height: 50,
alignItems: 'flex-start',
justifyContent: 'flex-end',
borderRadius: 8,
fontSize: 12
},
card5_gradient2:{
  position: 'absolute',
  padding:15,
  left: 0,
  right: 0,
  bottom: 0,
  height: screenHeight * 0.13,
  alignItems: 'flex-start',
  justifyContent: 'flex-end',
  borderRadius: 8,
  fontSize: 12
  },
  card5_gradient4:{
    position: 'absolute',
    padding:15,
    left: 0,
    right: 0,
    bottom: 0,
    height: screenHeight * 0.12,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    borderRadius: 8
    },
  card5_gradient3:{
    position: 'absolute',
    padding:10,
    left: 0,
    right: 0,
    bottom: 0,
    width:'98%',
    height: screenHeight * 0.10,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    borderRadius: 8
    },
card5_background:{
width: '100%',
height: 45,
alignItems: 'flex-start',
alignSelf: 'center', 
justifyContent: 'flex-end',
},
card5_background2:{
  width: '100%',
  height: screenHeight * 0.13,
  alignItems: 'flex-start',
  alignSelf: 'center', 
  justifyContent: 'flex-end',

},
card5_background4:{
  width: '100%',
  height: screenHeight * 0.12,
  alignItems: 'flex-start',
  alignSelf: 'center', 
  justifyContent: 'flex-end',

},
card5_background3:{
  width: '100%',
  height: screenHeight * 0.10,
  alignItems: 'flex-start',
  alignSelf: 'center', 
  justifyContent: 'flex-end',

},


card6_view:{
width: screenWidth*0.35,
marginLeft: 15,
},

card6_background:{
width: screenWidth*0.35,
height: screenHeight * 0.13,
marginLeft: 10,
},

card6_gradient:{
width: screenWidth*0.35,
height: screenHeight * 0.13,
backgroundColor: hexToRgba(PrimaryColor, '0.5'),
borderRadius: 8,
justifyContent: 'flex-end',
alignItems: 'flex-start'
},

card6_title:{
fontSize: 15,
paddingHorizontal:15,
paddingVertical:10,
color:'#fff',
fontWeight:'bold'
},

itemListView:{
width:70,
height:70,
backgroundColor:PrimaryColor,
borderRadius: 100,
marginRight:10,
justifyContent: 'center',
alignItems: 'center',
alignSelf: 'center', 
},

itemListImage:{
width:45,
height:45,
},

itemListView2:{
width:90,
height:90,
backgroundColor:'#fff',
borderRadius: 100,
marginRight:10,
justifyContent: 'center',
alignItems: 'center',
alignSelf: 'center', 
},

itemListImage2:{
width:70,
height:70,
},

title_categories:{
color: '#FFF',
fontSize: 14,
fontWeight: 'bold'
},

title_categories_background:{
width: screenWidth*0.9,
alignItems: 'center',
padding: 15,
borderBottomLeftRadius: 8,
borderBottomRightRadius: 8
},

title_categories_border:{
height: 2,
backgroundColor: PrimaryColor,
width: 50
},

gradient_categories:{
position: 'absolute',
left: 0,
right: 0,
bottom: 0,
height: screenHeight*0.21,
alignSelf: 'center', 
alignItems: 'center',
justifyContent: 'flex-end',
borderRadius: 8
},

background_categories:{
width: screenWidth*0.9,
alignSelf: 'center', 
height: screenHeight*0.21,
alignItems: 'center',
justifyContent: 'flex-end',
marginBottom: 10,
borderRadius: 8
},

switchRow: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
paddingVertical: 8,
paddingHorizontal: 16,
},

LoadMore:{
borderRadius: 100,
borderWidth: 1.5,
borderColor: PrimaryColor,
width: '93%',
height: screenHeight*0.07,
marginHorizontal: 20,
alignSelf: 'center',
justifyContent: 'center',
alignContent: 'center',
alignItems: 'center',
},

NoMoreItems:{
height: 40,
alignItems: 'center',
justifyContent: 'center',
borderRadius: 6,
marginBottom: 60
},

PageLogo:{
width: '100%',
height: screenHeight/10,
maxHeight: '100%',
marginBottom: 50,
},

AnimatedScrollScreen:{
width: '100%',
paddingVertical: 45,
paddingHorizontal: 10,
flex: 1,
},

ContentScreen:{
width: '100%',
paddingVertical: 10,
paddingHorizontal: 10,
flex: 1,
},

ModalScreen:{
width: '100%',
paddingHorizontal: 10,
flex: 1,	
},

PageScreen:{
width: '100%',
paddingVertical: 30,
paddingHorizontal: 30,
flex: 1,
},

GuestPageScreen:{
width: '100%',
paddingVertical: 30,
paddingHorizontal: 30,
flex: 1,
},

RowBackground:{
margin: 10,
borderRadius: 10,
justifyContent:'center',
alignItems:'center',
flexDirection:'column'
},

RowBorder:{
width: 60,
height: 4,
marginTop:10,
backgroundColor: PrimaryColor
},

SearchInput:{
marginHorizontal: 15,
marginVertical: 15,
elevation:0,
borderWidth:1
},

SearchInputStyle:{
fontSize: 17,
},

ExerciseImage:{
width: screenWidth*0.85,
height: screenHeight*0.25,
marginBottom:20,
alignSelf:'center',
position:'relative'
},

ExerciseImageView:{
width: screenWidth*0.85,
height: screenHeight*0.25,
justifyContent:'center',
alignItems:'center',
position:'absolute'
},

ExerciseTitle:{
fontSize:18,
alignSelf:'center',
fontWeight:'bold',
},

ExerciseSubTitle:{
fontWeight:'bold',
color: PrimaryColor
},

ExerciseCol:{
justifyContent:'center',
alignItems:'center',
marginBottom:10

},

ExerciseColTitle:{
fontSize:18,
fontWeight:'bold',
marginBottom:5
},

ExerciseColSubTitle:{
fontSize:18,
},

ExerciseColIcon:{
color:PrimaryColor,
fontSize:32,
marginBottom:8
},

ExerciseAccordion:{
},

ExerciseAccordionTitle:{
fontWeight:'bold',
fontSize:16
},

ExerciseAccordionView:{
marginHorizontal:20,
marginTop:15
},

ExerciseInfoCaption:{
fontSize:15,
marginBottom:15
},

HeaderImage:{
width: screenWidth,
height: screenHeight*0.40,
},

HeaderGradient:{
width: screenWidth,
height: screenHeight*0.40,
justifyContent:'center',
alignItems:'center',
},

HeaderTitle:{
fontWeight:'bold',
color:'#fff',
fontSize:16,
marginBottom:8,
paddingTop:40
},

HeaderSubTitle:{
fontWeight:'bold',
color:PrimaryColor,
fontSize:16	
},

Header2Image:{
width: screenWidth,
height: screenHeight*0.40,
},

Header2Gradient:{
width: screenWidth,
height: screenHeight*0.40,
justifyContent:'flex-end',
alignItems:'flex-start',
paddingVertical:30,
paddingHorizontal:25
},

Header2Category:{
fontWeight:'bold',
color:PrimaryColor,
fontSize:16,
},

Header2Title:{
fontWeight:'bold',
color:'#fff',
fontSize:20,
marginVertical:8,
},

Header2SubTitle:{
color:'rgba(255,255,255,0.8)',
fontSize:16	
},

WorkoutGrid:{
backgroundColor:PrimaryColor
},

WorkoutGridCol:{
padding: 10,
alignItems:'center',
},

WorkoutGridTitle:{
fontSize:16,
color:'rgba(0,0,0,0.7)',
fontWeight:'bold',
},

WorkoutGridSubTitle:{
fontSize:16,
color:'rgba(0,0,0,0.5)',
},

DietGrid:{
backgroundColor:PrimaryColor
},

DietGridCol:{
padding: 15,
alignItems:'center',
},

DietGridTitle:{
fontSize:16,
marginBottom:5,
color:'rgba(0,0,0,0.7)',
fontWeight:'bold',
},

DietGridSubTitle:{
fontSize:16,
color:'rgba(0,0,0,0.5)',
},

DayList:{
paddingVertical:15,
marginHorizontal:10,
backgroundColor:'rgba(255,255,255,0.1)',
flexDirection:'row',
marginVertical:5,
borderRadius:8,
paddingHorizontal:15,
position:'relative'
},

DayListText:{
fontSize:15,
},

DayListIcon:{
color:PrimaryColor,
fontSize:22,
right:10,
top:13,
position:'absolute'
},
// select screen 
Select_container: {
    paddingLeft:5,
    marginHorizontal: 5,

  },
  Select_label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    
  },
  Select_Radio_label:{
    fontSize:20,
  },
  Select_picker: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    overflow: 'hidden',
  },
  radioButtonsContainer: {
    marginVertical:20,
    flexDirection: 'row',
    alignItems: 'center',


  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  Select_Radio_label: {
    marginLeft: 8,
    fontSize:16,
  },
  
 //Component question style

 selectedOption: {
  padding:10,
  transform: [{ scale: 1.1 }],
},
selectedOption2: {
  padding: 0,
  transform: [{ scale: 1.1 }],
  borderWidth: 2, // Set the border width
  borderColor: 'black', // Set the border color
  borderRadius: 8, // Set the border radius (adjust as needed)
},
optionContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
optionContainer2: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent:'center'
},
checkIcon: {
  marginRight: 5,
},
container: {
  flex: 1, // Take the whole available space
  justifyContent: 'center', // Center the content vertically
  alignItems: 'center', // Center the content horizontally
},
Customecard: {
  width: '90%', 
  backgroundColor: 'transparent',

},
Customecard2: {
  width: '43%', 
  marginHorizontal:10,
  backgroundColor: 'transparent',

},
Customecard2: {
  width: '43%', 
  marginHorizontal:10,
  backgroundColor: 'transparent',

},
cardContent: {
marginVertical:5,
paddingVertical:0,
justifyContent:'center',

},
cardContent2: {
  marginVertical:0,
  paddingVertical:2,
  },
  cardContent3: {
    marginVertical:5,
    paddingVertical:5,
    },
 // end Component question style
//Select Component style
componentContainer: {
  width: screenWidth,
  flex: 1, // Take the whole available space
  alignItems: "center",
  marginVertical:20,
  
  
},
buttonContainer: {
  flexDirection: "row",
  justifyContent: "center",
  marginTop: 10,
},
button: {
  marginHorizontal: 10,
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor: "blue",
  borderRadius: 5,
},
disabledButton: {
  opacity: 0.5,
},
buttonText: {
  color: "white",
  fontSize: 18,
},
containerButton:{
  flexDirection: "row",
  justifyContent: "space-between",
  marginHorizontal: 30,
  marginVertical: 0,
},
containerButton2:{
  flexDirection: "row",
  justifyContent: "space-between",
  marginHorizontal: 30,
  marginVertical: 0,
  marginVertical:12
},
modalCenteredContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)" // Semi-transparent black background
},

modalCenteredContent: {
  backgroundColor: "#fff",
  minHeight: "50%",
  borderRadius: 10,
  width: "80%",
  padding: 20, // Add padding for better spacing
  justifyContent: "center", // Center text vertically
  alignItems: "center", // Center text horizontally
},
backgroundImage: {
  flex: 1,
  resizeMode: "cover",
  justifyContent: "center",
  // You can also set other styles here for the image background
},});