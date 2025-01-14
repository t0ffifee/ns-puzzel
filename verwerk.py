
with open("stations.txt") as file:
  for row in file:
    print(row.lower(), end="")
