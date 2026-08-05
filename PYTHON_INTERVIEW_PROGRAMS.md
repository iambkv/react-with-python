# 🐍 Python Interview Programs — Practice Questions with Solutions

## How to Use This File

Each question includes:
- **Problem statement** — what you need to solve
- **Solution code** — working Python code
- **Output** — what the program prints
- **Explanation** — how it works step by step

Run any program: save it as a `.py` file and execute `python filename.py`

---

## Section 1: Basic Programs (Freshers Level)

---

### Q1: Reverse a String

**Problem:** Write a program to reverse a given string.

```python
# Method 1: Using slicing
def reverse_string(s):
    return s[::-1]

# Method 2: Using loop
def reverse_string_loop(s):
    result = ""
    for char in s:
        result = char + result
    return result

# Test
text = "Hello World"
print(f"Original: {text}")
print(f"Reversed (slicing): {reverse_string(text)}")
print(f"Reversed (loop): {reverse_string_loop(text)}")
```

**Output:**
```
Original: Hello World
Reversed (slicing): dlroW olleH
Reversed (loop): dlroW olleH
```

**Explanation:**
- `s[::-1]` — slicing with step -1 reads the string from end to start
- Loop method: prepend each character to result — "H" → "eH" → "leH" → "lleH"...

---

### Q2: Check if a String is Palindrome

**Problem:** Check if a string reads the same forward and backward.

```python
def is_palindrome(s):
    s = s.lower().replace(" ", "")
    return s == s[::-1]

# Test
words = ["madam", "racecar", "hello", "A man a plan a canal Panama"]
for word in words:
    result = is_palindrome(word)
    print(f"'{word}' → Palindrome: {result}")
```

**Output:**
```
'madam' → Palindrome: True
'racecar' → Palindrome: True
'hello' → Palindrome: False
'A man a plan a canal Panama' → Palindrome: True
```

**Explanation:**
- Convert to lowercase and remove spaces for fair comparison
- Compare original with reversed version

---

### Q3: Fibonacci Series

**Problem:** Print the first N numbers of the Fibonacci sequence.

```python
def fibonacci(n):
    series = []
    a, b = 0, 1
    for _ in range(n):
        series.append(a)
        a, b = b, a + b
    return series

# Test
n = 10
print(f"Fibonacci series (first {n} numbers): {fibonacci(n)}")
```

**Output:**
```
Fibonacci series (first 10 numbers): [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

**Explanation:**
- Start with 0 and 1
- Each next number = sum of previous two
- `a, b = b, a + b` — simultaneous assignment (a becomes b, b becomes a+b)

---

### Q4: Check Prime Number

**Problem:** Write a function to check if a number is prime.

```python
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

# Test
numbers = [1, 2, 3, 4, 17, 20, 29, 100]
for num in numbers:
    print(f"{num} → Prime: {is_prime(num)}")
```

**Output:**
```
1 → Prime: False
2 → Prime: True
3 → Prime: True
4 → Prime: False
17 → Prime: True
20 → Prime: False
29 → Prime: True
100 → Prime: False
```

**Explanation:**
- A prime number is divisible only by 1 and itself
- We only check up to square root of n (optimization)
- If any number divides evenly (remainder 0), it's not prime

---

### Q5: Factorial of a Number

**Problem:** Calculate factorial using recursion and iteration.

```python
# Method 1: Recursion
def factorial_recursive(n):
    if n == 0 or n == 1:
        return 1
    return n * factorial_recursive(n - 1)

# Method 2: Iteration
def factorial_iterative(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

# Test
for num in [0, 1, 5, 7, 10]:
    print(f"{num}! = {factorial_recursive(num)} (recursive) = {factorial_iterative(num)} (iterative)")
```

**Output:**
```
0! = 1 (recursive) = 1 (iterative)
1! = 1 (recursive) = 1 (iterative)
5! = 120 (recursive) = 120 (iterative)
7! = 5040 (recursive) = 5040 (iterative)
10! = 3628800 (recursive) = 3628800 (iterative)
```

---

### Q6: Find Duplicate Elements in a List

**Problem:** Find all duplicate elements in a list.

```python
def find_duplicates(lst):
    seen = set()
    duplicates = set()
    for item in lst:
        if item in seen:
            duplicates.add(item)
        seen.add(item)
    return list(duplicates)

# Test
numbers = [1, 2, 3, 4, 2, 5, 6, 3, 7, 8, 1]
print(f"List: {numbers}")
print(f"Duplicates: {find_duplicates(numbers)}")
```

**Output:**
```
List: [1, 2, 3, 4, 2, 5, 6, 3, 7, 8, 1]
Duplicates: [1, 2, 3]
```

**Explanation:**
- Use a `set` to track what we've seen
- If an item is already in `seen`, it's a duplicate
- Sets have O(1) lookup time — very fast

---

### Q7: Count Character Frequency in a String

**Problem:** Count how many times each character appears.

```python
def char_frequency(s):
    freq = {}
    for char in s:
        if char != " ":
            freq[char] = freq.get(char, 0) + 1
    return freq

# Test
text = "hello world"
print(f"String: '{text}'")
print(f"Frequency: {char_frequency(text)}")

# Find most common character
freq = char_frequency(text)
most_common = max(freq, key=freq.get)
print(f"Most common: '{most_common}' ({freq[most_common]} times)")
```

**Output:**
```
String: 'hello world'
Frequency: {'h': 1, 'e': 1, 'l': 3, 'o': 2, 'w': 1, 'r': 1, 'd': 1}
Most common: 'l' (3 times)
```

---

### Q8: Sort a List Without Built-in sort()

**Problem:** Implement Bubble Sort algorithm.

```python
def bubble_sort(lst):
    n = len(lst)
    arr = lst.copy()  # Don't modify original
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]  # Swap
    return arr

# Test
numbers = [64, 34, 25, 12, 22, 11, 90]
print(f"Original: {numbers}")
print(f"Sorted:   {bubble_sort(numbers)}")
```

**Output:**
```
Original: [64, 34, 25, 12, 22, 11, 90]
Sorted:   [11, 12, 22, 25, 34, 64, 90]
```

**Explanation:**
- Compare adjacent elements and swap if they're in wrong order
- After each pass, the largest unsorted element "bubbles up" to its correct position
- Repeat until no swaps needed

---

### Q9: Two Sum Problem

**Problem:** Find two numbers in a list that add up to a target.

```python
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test
numbers = [2, 7, 11, 15]
target = 9
result = two_sum(numbers, target)
print(f"List: {numbers}")
print(f"Target: {target}")
print(f"Indices: {result}")
print(f"Numbers: {numbers[result[0]]} + {numbers[result[1]]} = {target}")
```

**Output:**
```
List: [2, 7, 11, 15]
Target: 9
Indices: [0, 1]
Numbers: 2 + 7 = 9
```

**Explanation:**
- For each number, calculate what we need (target - current)
- Check if that complement was seen before
- Use a dictionary for O(1) lookup — much faster than checking all pairs

---

### Q10: FizzBuzz

**Problem:** Print numbers 1-20. For multiples of 3 print "Fizz", multiples of 5 print "Buzz", multiples of both print "FizzBuzz".

```python
def fizzbuzz(n):
    for i in range(1, n + 1):
        if i % 3 == 0 and i % 5 == 0:
            print("FizzBuzz", end=" ")
        elif i % 3 == 0:
            print("Fizz", end=" ")
        elif i % 5 == 0:
            print("Buzz", end=" ")
        else:
            print(i, end=" ")
    print()

# Test
fizzbuzz(20)
```

**Output:**
```
1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz 16 17 Fizz 19 Buzz
```

---

## Section 2: Intermediate Programs (1-3 Years Experience)

---

### Q11: Anagram Check

**Problem:** Check if two strings are anagrams (contain same characters in different order).

```python
def is_anagram(s1, s2):
    s1 = s1.lower().replace(" ", "")
    s2 = s2.lower().replace(" ", "")
    return sorted(s1) == sorted(s2)

# Method 2: Using dictionary
def is_anagram_dict(s1, s2):
    s1 = s1.lower().replace(" ", "")
    s2 = s2.lower().replace(" ", "")
    if len(s1) != len(s2):
        return False
    freq = {}
    for char in s1:
        freq[char] = freq.get(char, 0) + 1
    for char in s2:
        freq[char] = freq.get(char, 0) - 1
        if freq[char] < 0:
            return False
    return True

# Test
pairs = [("listen", "silent"), ("hello", "world"), ("anagram", "nagaram")]
for s1, s2 in pairs:
    print(f"'{s1}' and '{s2}' → Anagram: {is_anagram(s1, s2)}")
```

**Output:**
```
'listen' and 'silent' → Anagram: True
'hello' and 'world' → Anagram: False
'anagram' and 'nagaram' → Anagram: True
```

---

### Q12: Remove Duplicates from List (Maintain Order)

**Problem:** Remove duplicate elements while keeping the original order.

```python
def remove_duplicates(lst):
    seen = set()
    result = []
    for item in lst:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

# Using dict.fromkeys (Python 3.7+ maintains insertion order)
def remove_duplicates_v2(lst):
    return list(dict.fromkeys(lst))

# Test
numbers = [1, 3, 5, 3, 7, 1, 9, 5, 11, 7]
print(f"Original:            {numbers}")
print(f"Without duplicates:  {remove_duplicates(numbers)}")
print(f"Using dict.fromkeys: {remove_duplicates_v2(numbers)}")
```

**Output:**
```
Original:            [1, 3, 5, 3, 7, 1, 9, 5, 11, 7]
Without duplicates:  [1, 3, 5, 7, 9, 11]
Using dict.fromkeys: [1, 3, 5, 7, 9, 11]
```

---

### Q13: Find Second Largest Number

**Problem:** Find the second largest number in a list without sorting.

```python
def second_largest(lst):
    if len(lst) < 2:
        return None
    first = second = float('-inf')
    for num in lst:
        if num > first:
            second = first
            first = num
        elif num > second and num != first:
            second = num
    return second if second != float('-inf') else None

# Test
numbers = [12, 35, 1, 10, 34, 1]
print(f"List: {numbers}")
print(f"Second largest: {second_largest(numbers)}")
```

**Output:**
```
List: [12, 35, 1, 10, 34, 1]
Second largest: 34
```

---

### Q14: Matrix Transpose

**Problem:** Transpose a matrix (convert rows to columns).

```python
def transpose(matrix):
    rows = len(matrix)
    cols = len(matrix[0])
    result = [[0] * rows for _ in range(cols)]
    for i in range(rows):
        for j in range(cols):
            result[j][i] = matrix[i][j]
    return result

# Using zip (Pythonic way)
def transpose_zip(matrix):
    return [list(row) for row in zip(*matrix)]

# Test
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print("Original:")
for row in matrix:
    print(f"  {row}")

result = transpose(matrix)
print("\nTransposed:")
for row in result:
    print(f"  {row}")
```

**Output:**
```
Original:
  [1, 2, 3]
  [4, 5, 6]
  [7, 8, 9]

Transposed:
  [1, 4, 7]
  [2, 5, 8]
  [3, 6, 9]
```

---

### Q15: Flatten a Nested List

**Problem:** Convert a nested list into a single flat list.

```python
def flatten(lst):
    result = []
    for item in lst:
        if isinstance(item, list):
            result.extend(flatten(item))  # Recursion for nested lists
        else:
            result.append(item)
    return result

# Test
nested = [1, [2, 3], [4, [5, 6]], 7, [8, [9, [10]]]]
print(f"Nested:    {nested}")
print(f"Flattened: {flatten(nested)}")
```

**Output:**
```
Nested:    [1, [2, 3], [4, [5, 6]], 7, [8, [9, [10]]]]
Flattened: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

---

### Q16: Merge Two Sorted Lists

**Problem:** Merge two sorted lists into one sorted list.

```python
def merge_sorted(list1, list2):
    result = []
    i = j = 0
    while i < len(list1) and j < len(list2):
        if list1[i] <= list2[j]:
            result.append(list1[i])
            i += 1
        else:
            result.append(list2[j])
            j += 1
    # Add remaining elements
    result.extend(list1[i:])
    result.extend(list2[j:])
    return result

# Test
a = [1, 3, 5, 7, 9]
b = [2, 4, 6, 8, 10]
print(f"List 1: {a}")
print(f"List 2: {b}")
print(f"Merged: {merge_sorted(a, b)}")
```

**Output:**
```
List 1: [1, 3, 5, 7, 9]
List 2: [2, 4, 6, 8, 10]
Merged: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

---

### Q17: Binary Search

**Problem:** Find an element in a sorted list using binary search.

```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# Test
numbers = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91]
targets = [23, 56, 100]
print(f"Sorted list: {numbers}\n")
for target in targets:
    index = binary_search(numbers, target)
    if index != -1:
        print(f"  {target} found at index {index}")
    else:
        print(f"  {target} not found")
```

**Output:**
```
Sorted list: [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91]

  23 found at index 5
  56 found at index 8
  100 not found
```

---

### Q18: Decorator Example (Commonly Asked)

**Problem:** Write a decorator that measures function execution time.

```python
import time

def timer_decorator(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"  {func.__name__}() took {end - start:.4f} seconds")
        return result
    return wrapper

@timer_decorator
def slow_function():
    total = sum(range(1000000))
    return total

@timer_decorator
def fast_function():
    return 2 + 2

# Test
print("Running slow_function:")
result1 = slow_function()
print(f"  Result: {result1}\n")

print("Running fast_function:")
result2 = fast_function()
print(f"  Result: {result2}")
```

**Output:**
```
Running slow_function:
  slow_function() took 0.0312 seconds
  Result: 499999500000

Running fast_function:
  fast_function() took 0.0000 seconds
  Result: 4
```

---

### Q19: List Comprehension Examples

**Problem:** Demonstrate various list comprehension patterns.

```python
# 1. Square of numbers
squares = [x**2 for x in range(1, 11)]
print(f"Squares 1-10: {squares}")

# 2. Even numbers only
evens = [x for x in range(1, 21) if x % 2 == 0]
print(f"Even numbers 1-20: {evens}")

# 3. Flatten 2D list
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [num for row in matrix for num in row]
print(f"Flattened matrix: {flat}")

# 4. String manipulation
words = ["hello", "world", "python", "code"]
upper_words = [w.upper() for w in words if len(w) > 4]
print(f"Uppercase (len > 4): {upper_words}")

# 5. Dictionary comprehension
names = ["Alice", "Bob", "Charlie"]
name_lengths = {name: len(name) for name in names}
print(f"Name lengths: {name_lengths}")
```

**Output:**
```
Squares 1-10: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
Even numbers 1-20: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
Flattened matrix: [1, 2, 3, 4, 5, 6, 7, 8, 9]
Uppercase (len > 4): ['HELLO', 'WORLD', 'PYTHON']
Name lengths: {'Alice': 5, 'Bob': 3, 'Charlie': 7}
```

---

### Q20: Generator Function (yield)

**Problem:** Create a generator that produces Fibonacci numbers on demand.

```python
def fibonacci_generator():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Test — get first 10 Fibonacci numbers
fib = fibonacci_generator()
first_10 = [next(fib) for _ in range(10)]
print(f"First 10 Fibonacci: {first_10}")

# Generator for even numbers
def even_numbers(limit):
    for i in range(2, limit + 1, 2):
        yield i

evens = list(even_numbers(20))
print(f"Even numbers up to 20: {evens}")
```

**Output:**
```
First 10 Fibonacci: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
Even numbers up to 20: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
```

**Why generators?**
- They produce values one at a time (lazy evaluation)
- Memory efficient — don't store entire list in memory
- `yield` pauses the function and returns a value; next call resumes from there

---

## Section 3: Advanced Programs (3+ Years Experience)

---

### Q21: LRU Cache Implementation

**Problem:** Implement a Least Recently Used cache with O(1) operations.

```python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)  # Mark as recently used
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # Remove least recently used

# Test
cache = LRUCache(3)
cache.put("a", 1)
cache.put("b", 2)
cache.put("c", 3)
print(f"Get 'a': {cache.get('a')}")   # Returns 1, marks 'a' as recent
cache.put("d", 4)                      # Cache full, removes 'b' (least recent)
print(f"Get 'b': {cache.get('b')}")   # Returns -1 (evicted)
print(f"Get 'c': {cache.get('c')}")   # Returns 3
print(f"Cache: {dict(cache.cache)}")
```

**Output:**
```
Get 'a': 1
Get 'b': -1
Get 'c': 3
Cache: {'a': 1, 'd': 4, 'c': 3}
```

---

### Q22: Singleton Pattern

**Problem:** Implement the Singleton design pattern in Python.

```python
class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.data = []
        return cls._instance

# Test
obj1 = Singleton()
obj2 = Singleton()

obj1.data.append("Hello")
obj2.data.append("World")

print(f"obj1.data: {obj1.data}")
print(f"obj2.data: {obj2.data}")
print(f"Same instance: {obj1 is obj2}")
```

**Output:**
```
obj1.data: ['Hello', 'World']
obj2.data: ['Hello', 'World']
Same instance: True
```

**Explanation:** Both `obj1` and `obj2` are the exact same object in memory. There's only ever one instance.

---

### Q23: Producer-Consumer with Threading

**Problem:** Implement a thread-safe producer-consumer pattern.

```python
import threading
import queue
import time

def producer(q, items):
    for item in items:
        print(f"  Producing: {item}")
        q.put(item)
        time.sleep(0.1)
    q.put(None)  # Signal to stop

def consumer(q):
    while True:
        item = q.get()
        if item is None:
            break
        print(f"  Consuming: {item}")
        time.sleep(0.2)

# Test
q = queue.Queue(maxsize=5)
items = ["apple", "banana", "cherry", "date", "elderberry"]

print("Producer-Consumer Pattern:")
prod = threading.Thread(target=producer, args=(q, items))
cons = threading.Thread(target=consumer, args=(q,))

prod.start()
cons.start()
prod.join()
cons.join()
print("Done!")
```

**Output:**
```
Producer-Consumer Pattern:
  Producing: apple
  Consuming: apple
  Producing: banana
  Producing: cherry
  Consuming: banana
  Producing: date
  Consuming: cherry
  Producing: elderberry
  Consuming: date
  Consuming: elderberry
Done!
```

---

### Q24: Context Manager (with statement)

**Problem:** Create a custom context manager for database connections.

```python
class DatabaseConnection:
    def __init__(self, db_name):
        self.db_name = db_name
        self.connection = None

    def __enter__(self):
        print(f"  Opening connection to '{self.db_name}'")
        self.connection = f"Connection({self.db_name})"
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"  Closing connection to '{self.db_name}'")
        self.connection = None
        if exc_type:
            print(f"  Error occurred: {exc_val}")
        return False  # Don't suppress exceptions

    def query(self, sql):
        print(f"  Executing: {sql}")
        return f"Results for '{sql}'"

# Test
print("Using context manager:")
with DatabaseConnection("users_db") as db:
    result = db.query("SELECT * FROM users")
    print(f"  Got: {result}")

print("\nConnection automatically closed - no leaks!")
```

**Output:**
```
Using context manager:
  Opening connection to 'users_db'
  Executing: SELECT * FROM users
  Got: Results for 'SELECT * FROM users'
  Closing connection to 'users_db'

Connection automatically closed - no leaks!
```

---

### Q25: Implement a Stack and Queue

**Problem:** Build stack (LIFO) and queue (FIFO) from scratch.

```python
class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.items.pop()

    def peek(self):
        if self.is_empty():
            return None
        return self.items[-1]

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)

class Queue:
    def __init__(self):
        self.items = []

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.items.pop(0)

    def front(self):
        if self.is_empty():
            return None
        return self.items[0]

    def is_empty(self):
        return len(self.items) == 0

# Test Stack (LIFO — Last In, First Out)
print("Stack (LIFO):")
stack = Stack()
stack.push("A")
stack.push("B")
stack.push("C")
print(f"  Push: A, B, C")
print(f"  Pop: {stack.pop()}")   # C (last in)
print(f"  Pop: {stack.pop()}")   # B
print(f"  Peek: {stack.peek()}") # A (still there)

# Test Queue (FIFO — First In, First Out)
print("\nQueue (FIFO):")
q = Queue()
q.enqueue("A")
q.enqueue("B")
q.enqueue("C")
print(f"  Enqueue: A, B, C")
print(f"  Dequeue: {q.dequeue()}")  # A (first in)
print(f"  Dequeue: {q.dequeue()}")  # B
print(f"  Front: {q.front()}")      # C
```

**Output:**
```
Stack (LIFO):
  Push: A, B, C
  Pop: C
  Pop: B
  Peek: A

Queue (FIFO):
  Enqueue: A, B, C
  Dequeue: A
  Dequeue: B
  Front: C
```

---

## Section 4: Scenario-Based Interview Questions & Answers

---

### S1: How would you handle millions of records in an API?

**Question:** Your API returns 1 million items. The frontend takes 30 seconds to load. How would you fix this?

**Answer:**

```python
# Problem: GET /api/items/ returns ALL items at once
# Solution: Implement PAGINATION

from fastapi import APIRouter, Query

router = APIRouter()

@router.get("/items/")
def get_items(
    page: int = Query(default=1, ge=1),          # Current page (minimum 1)
    page_size: int = Query(default=10, le=100),   # Items per page (max 100)
):
    skip = (page - 1) * page_size

    # MongoDB: skip N documents, limit to page_size
    items = list(
        collection.find()
        .skip(skip)
        .limit(page_size)
    )

    total = collection.count_documents({})

    return {
        "items": [serialize(item) for item in items],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
    }

# Request: GET /api/items/?page=2&page_size=10
# Returns items 11-20 out of 1,000,000
```

**Additional techniques:**
- Add database indexes for faster queries
- Implement caching (Redis) for frequently accessed data
- Use cursor-based pagination for large datasets
- Add search/filter to reduce result set

---

### S2: How do you prevent SQL/NoSQL injection?

**Question:** How do you ensure user input doesn't break your database queries?

**Answer:**

```python
# WRONG — vulnerable to injection
@router.get("/search/")
def search_bad(name: str):
    # If user sends: {"$gt": ""} as name, it returns ALL documents!
    items = collection.find({"name": name})
    return list(items)

# CORRECT — validate and sanitize input
from pydantic import BaseModel, Field, validator

class SearchQuery(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)

    @validator("name")
    def sanitize_name(cls, v):
        # Remove any MongoDB operators
        if isinstance(v, dict) or "$" in v:
            raise ValueError("Invalid characters in search")
        return v.strip()

@router.get("/search/")
def search_safe(query: SearchQuery):
    # Use regex for partial match (safe because input is validated)
    items = collection.find({
        "name": {"$regex": query.name, "$options": "i"}
    })
    return [serialize(item) for item in items]
```

**Key principles:**
1. Always validate input with Pydantic schemas
2. Never trust user input — always sanitize
3. Use parameterized queries (Pydantic handles this for us)
4. Limit string lengths to prevent abuse

---

### S3: How do you handle rate limiting?

**Question:** Your API is getting hit 10,000 times per second by one user. How do you protect it?

**Answer:**

```python
from fastapi import Request, HTTPException
from collections import defaultdict
import time

# Simple in-memory rate limiter
class RateLimiter:
    def __init__(self, max_requests=100, window_seconds=60):
        self.max_requests = max_requests
        self.window = window_seconds
        self.requests = defaultdict(list)

    def is_allowed(self, client_ip: str) -> bool:
        now = time.time()
        # Remove old requests outside the window
        self.requests[client_ip] = [
            t for t in self.requests[client_ip]
            if now - t < self.window
        ]
        # Check if under limit
        if len(self.requests[client_ip]) >= self.max_requests:
            return False
        self.requests[client_ip].append(now)
        return True

rate_limiter = RateLimiter(max_requests=100, window_seconds=60)

@router.get("/items/")
def get_items(request: Request):
    client_ip = request.client.host
    if not rate_limiter.is_allowed(client_ip):
        raise HTTPException(
            status_code=429,
            detail="Too many requests. Please try again later."
        )
    return item_model.get_all()
```

**Production solutions:**
- Use Redis for distributed rate limiting
- Implement token bucket algorithm
- Use API gateway (AWS API Gateway, nginx)
- Add request throttling per user/IP

---

### S4: How do you handle file uploads?

**Question:** Users need to upload profile pictures. How would you implement this?

**Answer:**

```python
from fastapi import UploadFile, File, HTTPException
import os
import uuid

UPLOAD_DIR = "uploads"
ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"]
MAX_SIZE = 5 * 1024 * 1024  # 5 MB

@router.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    # Validate file type
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(400, "Only JPEG, PNG, GIF allowed")

    # Read file and check size
    content = await file.read()
    if len(content) > MAX_SIZE:
        raise HTTPException(400, "File too large (max 5MB)")

    # Generate unique filename
    ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    filepath = os.path.join(UPLOAD_DIR, filename)

    # Save file
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    with open(filepath, "wb") as f:
        f.write(content)

    return {"filename": filename, "size": len(content), "url": f"/uploads/{filename}"}
```

---

### S5: How do you implement logging and error tracking?

**Question:** How do you debug production issues when something goes wrong?

**Answer:**

```python
import logging
from fastapi import Request
import traceback
import time

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[
        logging.FileHandler("app.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Middleware to log all requests
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    logger.info(f"→ {request.method} {request.url.path}")

    try:
        response = await call_next(request)
        duration = time.time() - start_time
        logger.info(f"← {response.status_code} ({duration:.3f}s)")
        return response
    except Exception as e:
        logger.error(f"✗ Error: {str(e)}\n{traceback.format_exc()}")
        raise

# Usage in controllers
def create_new_item(data: dict):
    logger.info(f"Creating item: {data['name']}")
    try:
        item = item_model.create(data)
        logger.info(f"Item created successfully: {item['id']}")
        return item
    except Exception as e:
        logger.error(f"Failed to create item: {str(e)}")
        raise HTTPException(500, "Internal server error")
```

**Log output example:**
```
2024-08-05 10:30:15 [INFO] app: → POST /api/items/
2024-08-05 10:30:15 [INFO] app: Creating item: Learn Python
2024-08-05 10:30:15 [INFO] app: Item created successfully: 64a7b3c2...
2024-08-05 10:30:15 [INFO] app: ← 201 (0.023s)
```

---

### S6: How do you write unit tests for an API?

**Question:** How would you test the item CRUD endpoints?

**Answer:**

```python
# test_items.py
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

# Helper: get auth token
def get_token():
    response = client.post("/api/auth/register", json={
        "name": "Test User",
        "email": "test@test.com",
        "password": "test123"
    })
    return response.json()["access_token"]

def test_create_item():
    token = get_token()
    response = client.post(
        "/api/items/",
        json={"name": "Test Item", "description": "Testing"},
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Test Item"
    assert "id" in data

def test_create_item_without_name():
    token = get_token()
    response = client.post(
        "/api/items/",
        json={"description": "No name"},
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 422  # Validation error

def test_get_items_unauthorized():
    response = client.get("/api/items/")
    assert response.status_code == 401

def test_delete_nonexistent_item():
    token = get_token()
    response = client.delete(
        "/api/items/000000000000000000000000",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 404
```

**Run tests:** `pytest test_items.py -v`

---

### S7: How do you handle database connection failures?

**Question:** MongoDB goes down in production. What happens to your API?

**Answer:**

```python
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
import time
import logging

logger = logging.getLogger(__name__)

def connect_with_retry(uri, max_retries=5, delay=2):
    """Connect to MongoDB with retry logic."""
    for attempt in range(1, max_retries + 1):
        try:
            client = MongoClient(uri, serverSelectionTimeoutMS=5000)
            # Verify connection works
            client.admin.command('ping')
            logger.info("Connected to MongoDB successfully")
            return client
        except (ConnectionFailure, ServerSelectionTimeoutError) as e:
            logger.warning(f"Connection attempt {attempt}/{max_retries} failed: {e}")
            if attempt < max_retries:
                time.sleep(delay * attempt)  # Exponential backoff
            else:
                logger.error("All connection attempts failed")
                raise

# Health check endpoint
@router.get("/health")
def health_check():
    try:
        client.admin.command('ping')
        return {"status": "healthy", "database": "connected"}
    except Exception:
        raise HTTPException(503, detail="Database unavailable")
```

**Key concepts:**
- **Retry with backoff** — don't give up on first failure, try again with increasing delays
- **Health check endpoint** — monitoring systems can check if API is working
- **Timeout settings** — don't wait forever for database connection
- **Graceful degradation** — return proper error messages, not crashes

---

## Summary: Topics to Focus On for Interviews

| Level | Key Topics |
|-------|-----------|
| **Fresher** | String manipulation, loops, lists, dictionaries, basic algorithms (sort, search) |
| **1-2 Years** | OOP, decorators, generators, list comprehension, error handling, file I/O |
| **3+ Years** | Design patterns, threading, caching, system design, testing, performance optimization |
| **Senior** | Architecture decisions, scalability, security, database design, mentoring ability |

### Quick Tips for Python Interviews:

1. **Always think about edge cases** — empty list, None input, negative numbers
2. **Explain time complexity** — O(n), O(n²), O(log n)
3. **Know the built-in data structures** — list, dict, set, tuple, deque
4. **Practice writing clean code** — meaningful variable names, comments
5. **Understand mutability** — lists are mutable, tuples and strings are not
6. **Know when to use what** — set for uniqueness, dict for lookup, list for order
