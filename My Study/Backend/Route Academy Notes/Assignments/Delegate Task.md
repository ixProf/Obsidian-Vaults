```cs
using System;

namespace DelegatesTask
{
    // Part 1: Custom Delegate
    public delegate double DiscountStrategy(double originalPrice);

    class Program
    {
        static void Main(string[] args)
        {
            double price = 100;

            #region Part 1: Custom Delegate

            DiscountStrategy discountMethod = StudentDiscount;
            
            #endregion

            // =========================
            // Part 2: Func Delegate
            // =========================

            Func<double, double> taxMethod = CalculateStandardTax;

            // =========================
            // Part 3: Action Multicast Delegate
            // =========================

            Action<string> onOrderCompleted = SendEmailNotification;
            onOrderCompleted += WriteToLog;

            // =========================
            // Part 4: Process Order
            // =========================

            ProcessOrder(
                price,
                discountMethod,
                taxMethod,
                onOrderCompleted
            );
        }


        // =====================================
        // Part 1: Discount Methods
        // =====================================

        static double NoDiscount(double originalPrice)
        {
            return originalPrice;
        }

        static double StudentDiscount(double originalPrice)
        {
            return originalPrice * 0.85;
        }

        static double VIPDiscount(double originalPrice)
        {
            return originalPrice * 0.70;
        }


        // =====================================
        // Part 2: Tax Calculation
        // =====================================

        static double CalculateStandardTax(double amount)
        {
            return amount * 1.08;
        }


        // =====================================
        // Part 3: Notification Methods
        // =====================================

        static void SendEmailNotification(string message)
        {
            Console.WriteLine($"Email Sent: {message}");
        }

        static void WriteToLog(string message)
        {
            Console.WriteLine($"Log File Updated: {message}");
        }


        // =====================================
        // Part 4: Process Order
        // =====================================

        static void ProcessOrder(
            double price,
            DiscountStrategy discountMethod,
            Func<double, double> taxMethod,
            Action<string> completionCallback)
        {
            Console.WriteLine("Processing Order...");

            // Apply discount
            double discountedPrice = discountMethod(price);

            // Add tax
            double finalPrice = taxMethod(discountedPrice);

            // Display prices
            Console.WriteLine($"Discounted Price: ${discountedPrice:F2}");
            Console.WriteLine($"Final Price: ${finalPrice:F2}");

            // Trigger notifications
            completionCallback(
                $"Order completed. Final price: ${finalPrice:F2}"
            );
        }
    }
}
```