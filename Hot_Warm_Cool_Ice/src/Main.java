import java.util.Arrays;
import java.util.Random;
import java.util.Scanner;

import static java.lang.Math.abs;

public class Main {
    public static void main(String[] args) {
        String[] alphabet = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
                "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
                "U", "V", "W", "X", "Y", "Z"};
        Random random = new Random();
        int index = random.nextInt(alphabet.length);
        String predictLetter = alphabet[index];

        int count = 0;

        while(true) {
            count++;

            Scanner letter = new Scanner(System.in);
            System.out.println("Guess the letter:");
            String guessLetter = letter.nextLine().toUpperCase();

            if (!Arrays.asList(alphabet).contains(guessLetter)) {
                System.out.println("Invalid input! Please enter a letter A-Z.");
                continue;
            }

            int guessNumber = Arrays.asList(alphabet).indexOf(guessLetter);

//            if (guessNumber == -1) {
//                System.out.println("Invalid guess! Please enter A-Z only.");
//                continue;
//            }

            if (index == guessNumber) {
                System.out.println("You are Right!");
                break;
            } else if (abs(index - guessNumber) <= 3) {
                System.out.println("Hot");
            } else if (abs(index - guessNumber) > 3 && abs(index - guessNumber) <= 6) {
                System.out.println("Warm");
            } else if (abs(index - guessNumber) > 6 && abs(index - guessNumber) <= 9) {
                System.out.println("Cool");
            } else {
                System.out.println("Ice");
            }

        }
        System.out.println("You tried " +count +" times to get the right answer");
    }
}