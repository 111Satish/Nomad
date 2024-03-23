import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const TicTacToe = () => {
  const [grid, setGrid] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
        return grid[a];
      }
    }
    return null;
  };

  const handlePress = (index) => {
    if (grid[index] || winner) {
      return;
    }
    const newGrid = [...grid];
    newGrid[index] = currentPlayer;
    setGrid(newGrid);
    const winner = checkWinner();
    if (winner) {
      setWinner(winner);
      Alert.alert('Game Over', `Player ${winner} wins!`, [{ text: 'OK' }]);
    } else if (!newGrid.includes(null)) {
      Alert.alert('Game Over', 'It\'s a draw!', [{ text: 'OK' }]);
    } else {
      const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
      setCurrentPlayer(nextPlayer);
    }
  };

  const handleReset = () => {
    setGrid(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const renderSquare = (index) => {
    return (
      <TouchableOpacity
        key={index} // Add key prop here
        style={[
          styles.square,
          {
            backgroundColor: grid[index] === currentPlayer ? '#FFD700' : '#DDD',
            borderColor: grid[index] ? '#FF6347' : '#999',
          },
        ]}
        onPress={() => handlePress(index)}
      >
        <Text style={styles.squareText}>{grid[index]}</Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic-Tac-Toe</Text>
      <View style={styles.grid}>
        {grid.map((value, index) => renderSquare(index))}
      </View>
      <Text style={[styles.status, { color: currentPlayer === 'X' ? '#333' : '#555' }]}>
        {winner ? (
          <Text style={{ color: winner === 'X' ? '#FF6347' : '#4682B4' }}>Player {winner} wins!</Text>
        ) : (
          `Next Player: ${currentPlayer}`
        )}
      </Text>
      {(winner || !grid.includes(null)) && (
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Play Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1E1E', // Futuristic background color
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF', // White color for text
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  square: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10, // Rounded corners for a futuristic look
  },
  squareText: {
    fontSize: 48,
    color: '#FFF', // White color for text
  },
  status: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TicTacToe;
