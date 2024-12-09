import java.util.Random;
import java.util.Scanner;

public class NumberGuessingGame1 {
    private static Scanner scanner = new Scanner(System.in);
    private static Random random = new Random();

    public static void main(String[] args) {
        int totalRounds = 0;
        int totalScore = 0;
        boolean playAgain;

        do {
            totalRounds++;
            int score = playRound();
            totalScore += score;

            System.out.println("Do you want to play again? (yes/no)");
            playAgain = scanner.next().equalsIgnoreCase("yes");
        } while (playAgain);

        System.out.println("Total Rounds Played: " + totalRounds);
        System.out.println("Total Score: " + totalScore);
    }

    private static int playRound() {
        int attempts = 0;
        int maxAttempts = 7;
        int randomNumber = random.nextInt(100) + 1;
        boolean guessedCorrectly = false;

        System.out.println("Guess the number between 1 and 100:");

        while (attempts < maxAttempts && !guessedCorrectly) {
            attempts++;
            System.out.print("Attempt " + attempts + ": ");
            int userGuess = scanner.nextInt();

            if (userGuess < randomNumber) {
                System.out.println("Too low!");
            } else if (userGuess > randomNumber) {
                System.out.println("Too high!");
            } else {
                System.out.println("Correct! You've guessed the number in " + attempts + " attempts.");
                guessedCorrectly = true;
            }
        }

        if (!guessedCorrectly) {
            System.out.println("You've run out of attempts. The correct number was " + randomNumber);
        }

        return maxAttempts - attempts + (guessedCorrectly ? 3 : 0); // Simple scoring mechanism
    }
}
