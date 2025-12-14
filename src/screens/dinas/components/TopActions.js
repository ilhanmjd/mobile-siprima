import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../../theme/colors';
import spacing from '../../../theme/spacing';

const actions = [
  {
    label: 'ASET',
    buttons: ['Input', 'Hapus'],
    route: 'AssetWizard',
  },
  {
    label: 'RISIKO',
    buttons: ['Input'],
    route: 'RiskWizard',
  },
];

const filterChips = ['Laporan', 'Request'];

const TopActions = ({ navigation }) => {
  const [activeChip, setActiveChip] = React.useState(null);

  const handlePress = (item, btn) => {
    if (item.label === 'ASET' && btn === 'Input') {
      navigation.navigate('Asset', {
        screen: 'AssetWizard',
      });
      return;
    }
    if (item.label === 'RISIKO' && btn === 'Input') {
      navigation.navigate('Asset', {
        screen: 'RiskWizard',
      });
      return;
    }
    if (item.route) {
      navigation.navigate(item.route);
    }
  };

  const handleChipPress = (chip) => {
    setActiveChip(prev => (prev === chip ? null : chip));

    if (chip === 'Laporan') {
      navigation.navigate('Laporan'); // pastikan ada Stack.Screen name="Laporan"
    }
    if (chip === 'Request') {
      navigation.navigate('Request'); // pastikan ada Stack.Screen name="Request"
    }
  };

  const handleOpenCamera = () => {
    navigation.navigate('QrScanner'); // pastikan ada Stack.Screen name="QrScanner"
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.cardRow}>
        {actions.map((item) => (
          <View key={item.label} style={styles.card}>
            <Text style={styles.cardTitle}>{item.label}</Text>
            <View style={styles.cardButtons}>
              {item.buttons.map((btn) => (
                <TouchableOpacity
                  key={btn}
                  style={styles.smallButton}
                  onPress={() => handlePress(item, btn)}
                >
                  <Text style={styles.smallButtonText}>{btn}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.chipRow}>
        {filterChips.map((chip) => (
          <TouchableOpacity
            key={chip}
            style={[
              styles.chip,
              chip === activeChip && styles.chipActive,
            ]}
            onPress={() => handleChipPress(chip)}
          >
            <Text
              style={[
                styles.chipText,
                chip === activeChip && styles.chipTextActive,
              ]}
            >
              {chip}
            </Text>
          </TouchableOpacity>
        ))}

        {/* tombol kamera di sebelah chip */}
        <TouchableOpacity style={styles.cameraChip} onPress={handleOpenCamera}>
          <Text style={styles.cameraIcon}>📷</Text>
          <Text style={styles.cameraText}>Scan QR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: spacing.lg,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  card: {
    flex: 1,
    backgroundColor: '#1D3D8F',
    borderRadius: 16,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  smallButton: {
    backgroundColor: '#FFD86F',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: 999,
  },
  smallButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1D3D8F',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
    marginTop: 17,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.text,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipTextActive: {
    color: '#1D3D8F',
    fontWeight: '700',
  },
  cameraChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    paddingVertical: 6,
    borderRadius: 999,
    gap: 6,
  },
  cameraIcon: {
    fontSize: 14,
  },
  cameraText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#000',
  },
});

export default TopActions;
