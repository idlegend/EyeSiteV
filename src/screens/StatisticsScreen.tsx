// src/screens/StatisticsScreen.tsx

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
} from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { Card } from '../components/Card';
import { COLORS, SIZES } from '../constants/theme';
import { mockStatistics } from '../services/mockData';

const { width } = Dimensions.get('window');
const chartWidth = width - 32;

export const StatisticsScreen: React.FC = () => {
    // Sample data for charts
    const powerOutputData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                data: [8500, 9200, 8800, 9600, 9400, 8900, 9100],
            },
        ],
    };

    const efficiencyData = {
        labels: ['Site 1', 'Site 2', 'Site 3', 'Site 4', 'Site 5'],
        datasets: [
            {
                data: [94.5, 87.2, 96.8, 0, 91.3],
            },
        ],
    };

    const statusDistribution = [
        {
            name: 'Online',
            population: 3,
            color: COLORS.online,
            legendFontColor: COLORS.text,
            legendFontSize: 12,
        },
        {
            name: 'Warning',
            population: 1,
            color: COLORS.warningStatus,
            legendFontColor: COLORS.text,
            legendFontSize: 12,
        },
        {
            name: 'Maintenance',
            population: 1,
            color: COLORS.maintenance,
            legendFontColor: COLORS.text,
            legendFontSize: 12,
        },
    ];

    const chartConfig = {
        backgroundColor: COLORS.surface,
        backgroundGradientFrom: COLORS.surface,
        backgroundGradientTo: COLORS.surface,
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(26, 35, 126, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(117, 117, 117, ${opacity})`,
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: COLORS.primary,
        },
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Statistics</Text>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Overview Cards */}
                <View style={styles.overviewGrid}>
                    <Card style={styles.overviewCard}>
                        <Text style={styles.overviewValue}>{mockStatistics.totalSites}</Text>
                        <Text style={styles.overviewLabel}>Total Sites</Text>
                    </Card>
                    <Card style={styles.overviewCard}>
                        <Text style={[styles.overviewValue, { color: COLORS.success }]}>
                            {mockStatistics.uptime}%
                        </Text>
                        <Text style={styles.overviewLabel}>Uptime</Text>
                    </Card>
                </View>

                {/* Power Output Chart */}
                <Card style={styles.chartCard}>
                    <Text style={styles.chartTitle}>Weekly Power Output (kW)</Text>
                    <LineChart
                        data={powerOutputData}
                        width={chartWidth - 32}
                        height={220}
                        chartConfig={chartConfig}
                        bezier
                        style={styles.chart}
                        withInnerLines={false}
                        withOuterLines={true}
                        withVerticalLabels={true}
                        withHorizontalLabels={true}
                    />
                </Card>

                {/* Efficiency Chart */}
                <Card style={styles.chartCard}>
                    <Text style={styles.chartTitle}>Site Efficiency Comparison (%)</Text>

                    <BarChart
                        data={efficiencyData}
                        width={chartWidth - 32}
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix="%"
                        chartConfig={{
                            ...chartConfig,
                            barPercentage: 0.7,
                        }}
                        style={styles.chart}
                        showValuesOnTopOfBars
                        fromZero
                    />
                </Card>

                {/* Status Distribution */}
                <Card style={styles.chartCard}>
                    <Text style={styles.chartTitle}>Site Status Distribution</Text>
                    <PieChart
                        data={statusDistribution}
                        width={chartWidth - 32}
                        height={200}
                        chartConfig={chartConfig}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                    />
                </Card>

                {/* Key Metrics */}
                <Card style={styles.metricsCard}>
                    <Text style={styles.chartTitle}>Key Metrics</Text>
                    <View style={styles.metricRow}>
                        <Text style={styles.metricLabel}>Total Power Output</Text>
                        <Text style={styles.metricValue}>
                            {mockStatistics.totalPowerOutput} kW
                        </Text>
                    </View>
                    <View style={styles.metricRow}>
                        <Text style={styles.metricLabel}>Average Efficiency</Text>
                        <Text style={styles.metricValue}>
                            {mockStatistics.averageEfficiency}%
                        </Text>
                    </View>
                    <View style={styles.metricRow}>
                        <Text style={styles.metricLabel}>Active Sites</Text>
                        <Text style={styles.metricValue}>
                            {mockStatistics.activeSites} / {mockStatistics.totalSites}
                        </Text>
                    </View>
                    <View style={styles.metricRow}>
                        <Text style={styles.metricLabel}>Open Tickets</Text>
                        <Text style={[styles.metricValue, { color: COLORS.error }]}>
                            {mockStatistics.openTickets}
                        </Text>
                    </View>
                    <View style={styles.metricRow}>
                        <Text style={styles.metricLabel}>Critical Alerts</Text>
                        <Text style={[styles.metricValue, { color: COLORS.error }]}>
                            {mockStatistics.criticalAlerts}
                        </Text>
                    </View>
                </Card>
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
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: COLORS.surface,
    },
    title: {
        fontSize: SIZES.h3,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
    },
    overviewGrid: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    overviewCard: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
    },
    overviewValue: {
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 4,
    },
    overviewLabel: {
        fontSize: SIZES.caption,
        color: COLORS.textSecondary,
    },
    chartCard: {
        marginBottom: 16,
        paddingVertical: 20,
    },
    chartTitle: {
        fontSize: SIZES.h6,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 16,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    metricsCard: {
        marginBottom: 16,
    },
    metricRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    metricLabel: {
        fontSize: SIZES.body,
        color: COLORS.textSecondary,
    },
    metricValue: {
        fontSize: SIZES.h6,
        fontWeight: 'bold',
        color: COLORS.text,
    },
});