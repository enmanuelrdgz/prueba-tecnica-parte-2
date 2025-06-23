import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
  const [animatedStats, setAnimatedStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
  });

  // Animaciones optimizadas - solo las esenciales
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const statsAnimations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;
  const quickStatsAnimations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;
  const sectionsAnimations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  // Mock statistics data
  const stats = {
    totalSales: 45280,
    totalOrders: 1247,
    totalProducts: 156,
    totalCustomers: 892,
    monthlyGrowth: 12.5,
    pendingOrders: 23,
    lowStockItems: 8,
    newCustomers: 34,
  };

  const recentOrders = [
    { id: '#3102', customer: 'Sophia Anderson', amount: 150.0, status: 'Completed' },
    { id: '#3101', customer: 'Michael Chen', amount: 89.99, status: 'Processing' },
    { id: '#3100', customer: 'Emma Wilson', amount: 245.5, status: 'Shipped' },
    { id: '#3099', customer: 'James Rodriguez', amount: 67.25, status: 'Pending' },
  ];

  const topProducts = [
    { name: 'Wireless Headphones', sales: 234, revenue: 20826 },
    { name: 'Smart Watch', sales: 189, revenue: 37611 },
    { name: 'Smartphone Pro', sales: 156, revenue: 46644 },
    { name: 'Laptop Stand', sales: 98, revenue: 4900 },
  ];

  useEffect(() => {
    // Animación simple del header - solo fade-in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    // Animaciones escalonadas para las tarjetas de estadísticas
    const statsDelays = [0, 100, 200, 300];
    statsAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: statsDelays[index],
        useNativeDriver: true,
      }).start();
    });

    // Animaciones para quick stats
    const quickStatsDelays = [400, 500, 600];
    quickStatsAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: quickStatsDelays[index],
        useNativeDriver: true,
      }).start();
    });

    // Animaciones para secciones
    const sectionsDelays = [700, 800];
    sectionsAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: sectionsDelays[index],
        useNativeDriver: true,
      }).start();
    });

    // Animación de números contadores
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedStats({
        totalSales: Math.floor(stats.totalSales * progress),
        totalOrders: Math.floor(stats.totalOrders * progress),
        totalProducts: Math.floor(stats.totalProducts * progress),
        totalCustomers: Math.floor(stats.totalCustomers * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(stats);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return '#10b981';
      case 'Processing':
        return '#f59e0b';
      case 'Shipped':
        return '#3b82f6';
      case 'Pending':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const StatCard = ({ title, value, icon, color, subtitle, animationValue, index }: any) => (
    <Animated.View
      style={[
        styles.statCard,
        { borderLeftColor: color },
        {
          opacity: animationValue,
          transform: [
            {
              translateY: animationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
            {
              scale: animationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.statCardContent}>
        <View style={styles.statCardLeft}>
          <Text style={styles.statCardTitle}>{title}</Text>
          <Text style={styles.statCardValue}>{value}</Text>
          {subtitle && <Text style={styles.statCardSubtitle}>{subtitle}</Text>}
        </View>
        <LinearGradient
          colors={[color + '20', color + '10']}
          style={styles.statCardIcon}
        >
          <Ionicons name={icon} size={24} color={color} />
        </LinearGradient>
      </View>
    </Animated.View>
  );

  const QuickStatItem = ({ icon, number, label, color, animationValue }: any) => (
    <Animated.View
      style={[
        styles.quickStatItem,
        {
          opacity: animationValue,
          transform: [
            {
              translateY: animationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [15, 0],
              }),
            },
          ],
        },
      ]}
    >
      <LinearGradient
        colors={[color + '15', color + '05']}
        style={styles.quickStatIcon}
      >
        <Ionicons name={icon} size={20} color={color} />
      </LinearGradient>
      <Text style={styles.quickStatNumber}>{number}</Text>
      <Text style={styles.quickStatLabel}>{label}</Text>
    </Animated.View>
  );

  return (
    <LinearGradient
      colors={['#f3e8ff', '#e9d5ff', '#ddd6fe']}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        {/* Header optimizado - sin slide animation */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Dashboard</Text>
            <Text style={styles.headerSubtitle}>Welcome back, Admin</Text>
          </View>
        </Animated.View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Main Stats Grid */}
          <View style={styles.statsGrid}>
            <StatCard
              title="Total Sales"
              value={formatPrice(animatedStats.totalSales)}
              icon="trending-up"
              color="#8b5cf6"
              subtitle={`+${stats.monthlyGrowth}% this month`}
              animationValue={statsAnimations[0]}
              index={0}
            />
            <StatCard
              title="Total Orders"
              value={animatedStats.totalOrders.toLocaleString()}
              icon="receipt"
              color="#3b82f6"
              animationValue={statsAnimations[1]}
              index={1}
            />
            <StatCard
              title="Products"
              value={animatedStats.totalProducts}
              icon="cube"
              color="#a855f7"
              animationValue={statsAnimations[2]}
              index={2}
            />
            <StatCard
              title="Customers"
              value={animatedStats.totalCustomers.toLocaleString()}
              icon="people"
              color="#f97316"
              animationValue={statsAnimations[3]}
              index={3}
            />
          </View>

          {/* Quick Stats Row */}
          <View style={styles.quickStatsRow}>
            <QuickStatItem
              icon="time"
              number={stats.pendingOrders}
              label="Pending Orders"
              color="#f59e0b"
              animationValue={quickStatsAnimations[0]}
            />
            <QuickStatItem
              icon="warning"
              number={stats.lowStockItems}
              label="Low Stock"
              color="#ef4444"
              animationValue={quickStatsAnimations[1]}
            />
            <QuickStatItem
              icon="person-add"
              number={stats.newCustomers}
              label="New Customers"
              color="#10b981"
              animationValue={quickStatsAnimations[2]}
            />
          </View>

          {/* Recent Orders Section */}
          <Animated.View
            style={[
              styles.section,
              {
                opacity: sectionsAnimations[0],
                transform: [
                  {
                    translateY: sectionsAnimations[0].interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Orders</Text>
                <Text style={styles.sectionSubtitle}>Latest customer orders</Text>
              </View>

              <View style={styles.ordersContainer}>
                {recentOrders.map((order, index) => (
                  <TouchableOpacity
                    key={order.id}
                    style={styles.orderItem}
                    activeOpacity={0.7}
                  >
                    <View style={styles.orderLeft}>
                      <Text style={styles.orderId}>{order.id}</Text>
                      <Text style={styles.orderCustomer}>{order.customer}</Text>
                    </View>
                    <View style={styles.orderRight}>
                      <Text style={styles.orderAmount}>{formatPrice(order.amount)}</Text>
                      <View
                        style={[
                          styles.orderStatus,
                          { backgroundColor: getStatusColor(order.status) + '20' },
                        ]}
                      >
                        <Text
                          style={[
                            styles.orderStatusText,
                            { color: getStatusColor(order.status) },
                          ]}
                        >
                          {order.status}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Animated.View>

          {/* Top Products Section */}
          <Animated.View
            style={[
              styles.section,
              {
                opacity: sectionsAnimations[1],
                transform: [
                  {
                    translateY: sectionsAnimations[1].interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Top Products</Text>
                <Text style={styles.sectionSubtitle}>Best performing products</Text>
              </View>

              <View style={styles.productsContainer}>
                {topProducts.map((product, index) => (
                  <TouchableOpacity
                    key={product.name}
                    style={styles.productItem}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      colors={['#8b5cf6', '#a855f7']}
                      style={styles.productRank}
                    >
                      <Text style={styles.productRankText}>{index + 1}</Text>
                    </LinearGradient>
                    <View style={styles.productInfo}>
                      <Text style={styles.productName}>{product.name}</Text>
                      <Text style={styles.productStats}>
                        {product.sales} sales • {formatPrice(product.revenue)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  scrollView: {
    flex: 1,
  },
  statsGrid: {
    padding: 16,
    gap: 12,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 12,
  },
  statCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statCardLeft: {
    flex: 1,
  },
  statCardTitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 6,
    fontWeight: '500',
  },
  statCardValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statCardSubtitle: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
  },
  statCardIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickStatsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  quickStatItem: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  quickStatIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickStatNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  sectionHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  ordersContainer: {
    padding: 20,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafb',
  },
  orderLeft: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  orderCustomer: {
    fontSize: 14,
    color: '#6b7280',
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  orderStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  orderStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  productsContainer: {
    padding: 20,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafb',
  },
  productRank: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  productRankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  productStats: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default DashboardScreen;