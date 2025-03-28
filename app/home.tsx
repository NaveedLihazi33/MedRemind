import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet
  
} from "react-native";
import { useRef,useEffect } from "react";
import { Svg,Circle } from "react-native-svg";



const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const { width } = Dimensions.get("window");
interface CircularProgressProps {
  progress: number;
  totalDoses: number;
  completedDoses: number;
}

function CircularProgress({
  progress,
  totalDoses,
  completedDoses,
}: CircularProgressProps) {
  const animationValue = useRef(new Animated.Value(0)).current;
  const size = width * 0.55;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  useEffect(()=>
  {
    Animated.timing(animationValue,{
      toValue:progress,
      duration:100,
      useNativeDriver:true
    }).start();
  },[progress]);

  const strokeDashOffset = animationValue.interpolate({
    inputRange:[0,1],
    outputRange:[circumference,0]
  });

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressTextContainer}>
        <Text style={styles.progressPercentage}>
          {Math.round(progress)}%
        </Text>
        <Text style={styles.progressLabel}>
          {completedDoses} of {totalDoses} Doses
        </Text>
      </View>
      <Svg width={size} height={size} style={styles.progressRing}>
        <Circle
        cx={size/2}
        cy={size/2}
        r={radius}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={strokeWidth}
        fill="none"
        />
        <AnimatedCircle
          cx={size/2}
          cy={size/2}
          r={radius}
          stroke="white"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
        />
      </Svg>
    </View>
  )

}

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} >
      <LinearGradient colors={["#1A8E2D", "#146922"]} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View style={
              {
                flex:1
              }
            }>
              <Text style={styles.greeting}>Daily Progress</Text>
            </View>

            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons  name="notifications-outline" size={24} color="white" />
              {<View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>

                </Text>
                </View>}
            </TouchableOpacity>
          </View>

          {/* circular progress */}
          <CircularProgress
            progress={50}
            totalDoses={10}
            completedDoses={5}

          />
        </View>
      </LinearGradient>


      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#F8F9FA"
  },
  header:{
    paddingTop:50,
    paddingBottom:25,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30
  },
  headerContent:{
    alignItems:"center",
    paddingHorizontal:20
  },
  headerTop:{
    flexDirection:"row",
    alignItems:"center",
    width:"100%",
    marginBottom:20
  },
  greeting:{
    fontSize:18,
    fontWeight:600,
    color:"white",
    opacity:0.9
  },
  content:{
    flex:1,
    paddingTop:20
  },
  notificationButton:{
    position:"relative",
    padding:8,
    backgroundColor:"rgba(2555,255,255,0.15)",
    borderRadius:12,
    marginLeft:8
  },
  notificationBadge:{
    position:"absolute",
    top:-4,
    right:-4,
    backgroundColor:"#FF5252",
    borderRadius:100,
    height:20,
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal:4,
    borderWidth:2,
    borderColor:"#146922",
    minWidth:20
  },
  notificationCount:{
    fontSize:11,
    fontWeight:"bold",
    color:"white"
  },
  progressContainer:{
    alignItems:"center",
    justifyContent:"center",
    marginVertical:10
  },
  progressTextContainer:{
    position:"absolute",
    zIndex:1,
    alignItems:"center",
    justifyContent:"center",
    
  },
  progressPercentage:{
    fontSize:36,
    color:"white",
    fontWeight:"bold"
  },
  progressLabel:{
    fontSize:14,
    color:"rgba(255,255,255,0.9)",
    fontWeight:"bold"
  },
  progressDetails:{
    fontSize:11,
    color:"white",
    fontWeight:"bold",
  },
  progressRing:{
    transform:[{
      rotate:"-90deg"
    }]
  }
})
