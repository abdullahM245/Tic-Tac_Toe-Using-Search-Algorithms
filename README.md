# Tic-Tac-Toe Using Search Algorithms
A web-based Tic-Tac-Toe game with an AI opponent built using HTML, CSS, and JavaScript. The AI employs various search algorithms such as BFS, DFS, Uniform-Cost Search (UCS), and Iterative Deepening Search (IDS) to determine the best moves.

## 🛠️ Features
- **Multiple Search Techniques**: Choose between BFS, DFS, UCS, and IDS to let the AI make its move.
- **Best-Move Insights**: AI provides recommendations by evaluating player moves and declares the "best move" based on the chosen algorithm.
- **Stylish, Modern Design**: A clean interface using CSS for an enjoyable user experience.
- **Interactive Gameplay**: Play against the AI, reset the game board, and switch between different algorithms.
- **Future Move Visualization**: Displays possible future boards based on the current game state.
- **Reset Functionality**: Reset the game at any time to start a new match or test a new strategy.

## 📂 Project Structure

    /tic-tac-toe-folder
    │
    ├── index.html         # Main HTML structure
    ├── styles.css         # CSS for styling the UI
    ├── script.js          # JavaScript logic for gameplay and AI algorithms
    └── README.md          # Documentation (this file)



🖥️ Installation

Clone the repository:

    git clone https://github.com/abdullahM245/Tic-Tac_Toe-Using-Search-Algorithms.git
    cd Tic-Tac_Toe-Using-Search-Algorithms


Open the project in Visual Studio Code:

    code .

Open the application:

   Simply open the index.html file in your browser.

    
🔑 Usage

- Play a Game:
   - Click on any empty cell to make a move.
   - The AI will respond using the chosen search algorithm.
    
- Choose AI Technique:
  - Click on one of the buttons labeled BFS, DFS, UCS, or IDS to switch the search algorithm.

- Reset the Game:
    Click the "Reset Game" button to clear the board and start fresh.

- Future Moves Preview:
    After each move, potential future boards are displayed to show what the AI is thinking.


⚙️ How It Works

- AI Search Techniques:
    The AI uses BFS, DFS, UCS, or IDS to search for the optimal move in the current state.

- Game Logic:
    The makeMove() function updates the board and checks for winners.
    The aiMove() function uses the selected algorithm to calculate the next move.

- Reset Functionality:
    The resetGame() function clears the game board and restores the initial state.

- Algorithm Descriptions:
    BFS: Explores nodes level by level.
    DFS: Explores as deep as possible along a branch.
    UCS: Expands the least-cost nodes first.
    IDS: Uses increasing depth limits to explore deeper over time.



💡 Acknowledgments

- The AI search techniques are inspired by common AI strategies such as BFS, DFS, UCS, and IDS.
- Game logic and styling are adapted for ease of use and responsiveness.


📧 Contact

For any questions or feedback, feel free to reach out:

- GitHub: https://github.com/abdullahM245/Tic-Tac_Toe-Using-Search-Algorithms

- Email: abdullahmousa.work@gmail.com
