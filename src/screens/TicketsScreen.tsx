// src/screens/TicketsScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabParamList, RootStackParamList } from '../types';
import { TicketCard } from '../components/TicketCard';
import { COLORS, SIZES } from '../constants/theme';
import { mockTickets } from '../services/mockData';

type TicketsNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Tickets'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: TicketsNavigationProp;
}

export const TicketsScreen: React.FC<Props> = ({ navigation }) => {
  const [filter, setFilter] = useState<'all' | 'open' | 'in-progress' | 'resolved'>('all');

  const filteredTickets = mockTickets.filter((ticket) => {
    if (filter === 'all') return true;
    return ticket.status === filter;
  });

  const getFilterCount = (status: typeof filter) => {
    if (status === 'all') return mockTickets.length;
    return mockTickets.filter((t) => t.status === status).length;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Support Tickets</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateTicket', {})}>
          <Ionicons name="add-circle" size={28} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <FilterButton
          label="All"
          count={getFilterCount('all')}
          active={filter === 'all'}
          onPress={() => setFilter('all')}
        />
        <FilterButton
          label="Open"
          count={getFilterCount('open')}
          active={filter === 'open'}
          onPress={() => setFilter('open')}
          color={COLORS.error}
        />
        <FilterButton
          label="In Progress"
          count={getFilterCount('in-progress')}
          active={filter === 'in-progress'}
          onPress={() => setFilter('in-progress')}
          color={COLORS.warning}
        />
        <FilterButton
          label="Resolved"
          count={getFilterCount('resolved')}
          active={filter === 'resolved'}
          onPress={() => setFilter('resolved')}
          color={COLORS.success}
        />
      </View>

      <FlatList
        data={filteredTickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TicketCard
            ticket={item}
            onPress={() => navigation.navigate('TicketDetails', { ticketId: item.id })}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="ticket-outline" size={64} color={COLORS.disabled} />
            <Text style={styles.emptyText}>No tickets found</Text>
          </View>
        }
      />
    </View>
  );
};

interface FilterButtonProps {
  label: string;
  count: number;
  active: boolean;
  onPress: () => void;
  color?: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  count,
  active,
  onPress,
  color,
}) => (
  <TouchableOpacity
    style={[
      styles.filterButton,
      active && styles.filterButtonActive,
      active && color && { backgroundColor: color + '20', borderColor: color },
    ]}
    onPress={onPress}
  >
    <Text
      style={[
        styles.filterButtonText,
        active && styles.filterButtonTextActive,
        active && color && { color },
      ]}
    >
      {label}
    </Text>
    <View
      style={[
        styles.countBadge,
        active && color && { backgroundColor: color },
      ]}
    >
      <Text style={[styles.countText, active && { color: COLORS.textLight }]}>
        {count}
      </Text>
    </View>
  </TouchableOpacity>
);

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
  title: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 6,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary + '20',
    borderColor: COLORS.primary,
  },
  filterButtonText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  countBadge: {
    backgroundColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  countText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: SIZES.h6,
    color: COLORS.textSecondary,
    marginTop: 16,
  },
});