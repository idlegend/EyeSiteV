// src/screens/DashboardScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabParamList, RootStackParamList } from '../types';
import { Card } from '../components/Card';
import { COLORS, SIZES } from '../constants/theme';
import { mockSites, mockStatistics, mockTickets } from '../services/mockData';

type DashboardNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Dashboard'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: DashboardNavigationProp;
}

const { width } = Dimensions.get('window');

export const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const activeSites = mockSites.filter((s) => s.status === 'online');
  const criticalTickets = mockTickets.filter((t) => t.priority === 'critical');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back</Text>
          <Text style={styles.userName}>Field Technician</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
          {criticalTickets.length > 0 && <View style={styles.notificationBadge} />}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Stats */}
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: COLORS.success + '20' }]}>
              <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
            </View>
            <Text style={styles.statValue}>{mockStatistics.activeSites}</Text>
            <Text style={styles.statLabel}>Active Sites</Text>
          </Card>

          <Card style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: COLORS.primary + '20' }]}>
              <Ionicons name="flash" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.statValue}>{mockStatistics.totalPowerOutput}</Text>
            <Text style={styles.statLabel}>Total kW</Text>
          </Card>

          <Card style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: COLORS.warning + '20' }]}>
              <Ionicons name="alert-circle" size={24} color={COLORS.warning} />
            </View>
            <Text style={styles.statValue}>{mockStatistics.openTickets}</Text>
            <Text style={styles.statLabel}>Open Tickets</Text>
          </Card>

          <Card style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: COLORS.info + '20' }]}>
              <Ionicons name="trending-up" size={24} color={COLORS.info} />
            </View>
            <Text style={styles.statValue}>{mockStatistics.averageEfficiency}%</Text>
            <Text style={styles.statLabel}>Avg Efficiency</Text>
          </Card>
        </View>

        {/* Critical Alerts */}
        {criticalTickets.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Critical Alerts</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Tickets')}>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
            {criticalTickets.map((ticket) => (
              <Card key={ticket.id} style={styles.alertCard}>
                <View style={styles.alertHeader}>
                  <Ionicons name="warning" size={20} color={COLORS.error} />
                  <Text style={styles.alertTitle} numberOfLines={1}>
                    {ticket.title}
                  </Text>
                </View>
                <Text style={styles.alertSite}>{ticket.siteName}</Text>
              </Card>
            ))}
          </View>
        )}

        {/* Recent Sites */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Sites</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sites')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {activeSites.slice(0, 3).map((site) => (
            <TouchableOpacity
              key={site.id}
              onPress={() => navigation.navigate('SiteDetails', { siteId: site.id })}
            >
              <Card style={styles.siteCard}>
                <View style={styles.siteHeader}>
                  <View style={styles.siteInfo}>
                    <Text style={styles.siteName}>{site.name}</Text>
                    <Text style={styles.siteLocation}>{site.location}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusDot,
                      {
                        backgroundColor:
                          site.status === 'online'
                            ? COLORS.online
                            : site.status === 'warning'
                            ? COLORS.warningStatus
                            : COLORS.offline,
                      },
                    ]}
                  />
                </View>
                <View style={styles.siteMetrics}>
                  <View style={styles.siteMetric}>
                    <Text style={styles.metricLabel}>Power</Text>
                    <Text style={styles.metricValue}>{site.powerOutput} kW</Text>
                  </View>
                  <View style={styles.siteMetric}>
                    <Text style={styles.metricLabel}>Efficiency</Text>
                    <Text style={styles.metricValue}>{site.efficiency}%</Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('CreateTicket', {})}
            >
              <View style={[styles.actionIcon, { backgroundColor: COLORS.error + '20' }]}>
                <Ionicons name="add-circle-outline" size={28} color={COLORS.error} />
              </View>
              <Text style={styles.actionText}>Create Ticket</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Sites')}
            >
              <View style={[styles.actionIcon, { backgroundColor: COLORS.primary + '20' }]}>
                <Ionicons name="location-outline" size={28} color={COLORS.primary} />
              </View>
              <Text style={styles.actionText}>View Sites</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Statistics')}
            >
              <View style={[styles.actionIcon, { backgroundColor: COLORS.info + '20' }]}>
                <Ionicons name="stats-chart-outline" size={28} color={COLORS.info} />
              </View>
              <Text style={styles.actionText}>Statistics</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: COLORS.success + '20' }]}>
                <Ionicons name="document-text-outline" size={28} color={COLORS.success} />
              </View>
              <Text style={styles.actionText}>Reports</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: COLORS.surface,
  },
  greeting: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  userName: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: (width - 44) / 2,
    alignItems: 'center',
    paddingVertical: 20,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: SIZES.h5,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  seeAll: {
    fontSize: SIZES.body,
    color: COLORS.primary,
    fontWeight: '600',
  },
  alertCard: {
    marginBottom: 8,
    backgroundColor: COLORS.error + '10',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  alertTitle: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  alertSite: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginLeft: 28,
  },
  siteCard: {
    marginBottom: 12,
  },
  siteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  siteInfo: {
    flex: 1,
  },
  siteName: {
    fontSize: SIZES.h6,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  siteLocation: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  siteMetrics: {
    flexDirection: 'row',
    gap: 24,
  },
  siteMetric: {
    flex: 1,
  },
  metricLabel: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: SIZES.h6,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    width: (width - 44) / 2,
    alignItems: 'center',
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: SIZES.caption,
    color: COLORS.text,
    fontWeight: '500',
  },
});