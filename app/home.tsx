import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  
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
    <View>
      <View>
        <Text>
          {Math.round(progress)}%
        </Text>
        <Text>
          {completedDoses} of {totalDoses} Doses
        </Text>
      </View>
      <Svg width={size} height={size}>
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
    <ScrollView>
      <LinearGradient colors={["#1A8E2D", "#146922"]}>
        <View>
          <View>
            <View>
              <Text>Daily Progress</Text>
            </View>

            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={24} color="white" />
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


