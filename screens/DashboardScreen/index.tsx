import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

// este componente esta completamente hardcodeado
// no hay nada interesante aqui
const DashboardScreen = () => {

  const mockStats = {
    totalSales: 45280,
    totalOrders: 1247,
    totalProducts: 156,
    totalCustomers: 892,
    monthlyGrowth: 12.5,
    pendingOrders: 23,
    lowStockItems: 8,
    newCustomers: 34,
    recentOrders: [
      { id: '#3102', customer: 'Sophia Anderson', amount: 150.0, status: 'Completed' },
      { id: '#3101', customer: 'Michael Chen', amount: 89.99, status: 'Processing' },
      { id: '#3100', customer: 'Emma Wilson', amount: 245.5, status: 'Shipped' },
      { id: '#3099', customer: 'James Rodriguez', amount: 67.25, status: 'Pending' },
    ],   
    topProducts: [
      { name: 'Wireless Headphones', sales: 234, revenue: 20826 },
      { name: 'Smart Watch', sales: 189, revenue: 37611 },
      { name: 'Smartphone Pro', sales: 156, revenue: 46644 },
      { name: 'Laptop Stand', sales: 98, revenue: 4900 },
    ] 
  };
  
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

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <View
      style={[
        styles.statCard,
        { borderLeftColor: color },
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
    </View>
  );

  const QuickStatItem = ({ icon, number, label, color  }) => (
    <View style={styles.quickStatItem}>
      <LinearGradient
        colors={[color + '15', color + '05']}
        style={styles.quickStatIcon}
      >
        <Ionicons name={icon} size={20} color={color} />
      </LinearGradient>
      <Text style={styles.quickStatNumber}>{number}</Text>
      <Text style={styles.quickStatLabel}>{label}</Text>
    </View>
  );

  return (
      <SafeAreaView style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Dashboard</Text>
            <Text style={styles.headerSubtitle}>Welcome back, Admin</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

          {/* Main Stats Grid */}
          <View style={styles.statsGrid}>
            <StatCard
              title="Total Sales"
              value={formatPrice(mockStats.totalSales)}
              icon="trending-up"
              color="#8b5cf6"
              subtitle={`+${mockStats.monthlyGrowth}% this month`}
            />
            <StatCard
              title="Total Orders"
              value={mockStats.totalOrders.toLocaleString()}
              icon="receipt"
              color="#3b82f6"
              subtitle={null}
            />
            <StatCard
              title="Products"
              value={mockStats.totalProducts}
              icon="cube"
              color="#a855f7"
              subtitle={null}
            />
            <StatCard
              title="Customers"
              value={mockStats.totalCustomers.toLocaleString()}
              icon="people"
              color="#f97316"
              subtitle={null}
            />
          </View>

          {/* Quick Stats Row */}
          <View style={styles.quickStatsRow}>
            <QuickStatItem
              icon="time"
              number={mockStats.pendingOrders}
              label="Pending Orders"
              color="#f59e0b"
            />
            <QuickStatItem
              icon="warning"
              number={mockStats.lowStockItems}
              label="Low Stock"
              color="#ef4444"
            />
            <QuickStatItem
              icon="person-add"
              number={mockStats.newCustomers}
              label="New Customers"
              color="#10b981"
            />
          </View>

          {/* Recent Orders Section */}
          <View style={styles.section}>
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Orders</Text>
                <Text style={styles.sectionSubtitle}>Latest customer orders</Text>
              </View>

              <View style={styles.ordersContainer}>
                {
                  mockStats.recentOrders.map((order) => (
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
                        <View style={[ styles.orderStatus, { backgroundColor: getStatusColor(order.status) + '20' }]}>
                          <Text style={[styles.orderStatusText, { color: getStatusColor(order.status) }]}>
                            {order.status}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                 ))
                }
              </View>
            </View>
          </View>

          {/* Top Products Section */}
          <Animated.View
            style={[
              styles.section,
             
            ]}
          >
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Top Products</Text>
                <Text style={styles.sectionSubtitle}>Best performing products</Text>
              </View>

              <View style={styles.productsContainer}>
                {mockStats.topProducts.map((product, index) => (
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
  );
};

export default DashboardScreen;