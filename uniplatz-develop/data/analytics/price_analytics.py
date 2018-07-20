import json
import statistics

j = json.load(open('posts.json'))

posts = []
for e in j:
    posts.append(j[e])

soldPosts = [x for x in posts if x["sold"]]
activePosts = [x for x in posts if not x["sold"]]

prices = [int(x["priceBeforeSold"]) for x in posts]
soldPrices = [int(x["priceBeforeSold"]) for x in soldPosts]
activePrices = [int(x["priceBeforeSold"]) for x in activePosts]

def printInfo(x,s):
    print("\nInformation about {} items:".format(s))
    x.sort()
    print("Data: {}".format(x))
    print("Mean: {}".format(statistics.mean(x)))
    print("Median: {}".format(statistics.median(x)))

printInfo(prices, "all")
printInfo(soldPrices, "sold")
printInfo(activePrices, "activePrices")
