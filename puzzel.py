from collections import defaultdict

s = "armbandatelier jammers"
counts = [0] * 26

for ch in s:
  value = ord(ch.lower()) - ord("a")
  counts[value] += 1


