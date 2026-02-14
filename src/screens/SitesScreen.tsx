// src/screens/SitesScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabParamList, RootStackParamList } from '../types';
import { SiteCard } from '../components/SiteCard';
import { COLORS, SIZES } from '../constants/theme';
import { mockSites } from '../services/mockData';

type SitesNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Sites'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: SitesNavigationProp;
}

export const SitesScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'online' | 'offline' | 'warning' | 'maintenance'>(
    'all'
  );

  const filteredSites = mockSites.filter((site) => {
    const matchesSearch =
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || site.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getFilterCount = (status: typeof filter) => {
    if (status === 'all') return mockSites.length;
    return mockSites.filter((s) => s.status === status).length;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sites</Text>
        <TouchableOpacity>
          <Ionicons name="filter-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={COLORS.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search sites..."
          placeholderTextColor={COLORS.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filterContainer}>
        <FilterButton
          label="All"
          count={getFilterCount('all')}
          active={filter === 'all'}
          onPress={() => setFilter('all')}
        />
        <FilterButton
          label="Online"
          count={getFilterCount('online')}
          active={filter === 'online'}
          onPress={() => setFilter('online')}
          color={COLORS.online}
        />
        <FilterButton
          label="Warning"
          count={getFilterCount('warning')}
          active={filter === 'warning'}
          onPress={() => setFilter('warning')}
          color={COLORS.warningStatus}
        />
        <FilterButton
          label="Offline"
          count={getFilterCount('offline')}
          active={filter === 'offline'}
          onPress={() => setFilter('offline')}
          color={COLORS.offline}
        />
      </View>

      <FlatList
        data={filteredSites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SiteCard
            site={item}
            onPress={() => navigation.navigate('SiteDetails', { siteId: item.id })}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="location-outline" size={64} color={COLORS.disabled} />
            <Text style={styles.emptyText}>No sites found</Text>
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
      {label} ({count})
    </Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: SIZES.borderRadius,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: SIZES.body,
    color: COLORS.text,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
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