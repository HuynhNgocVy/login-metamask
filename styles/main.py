words = "This is a name a is"

def m(key, value):
    return [(w, 1) for w in value.split(' ')]
print(m(None, words))   
def groupByKey(ps):
    d = dict()
    for k, v in ps:
        if k not in d.keys():
            d[k] = []
        d[k].append(v)
    return [(k,v) for k, v in d.items()]
print(groupByKey(m(None, words)))
def reduce(ps):
    return [(k, sum(v)) for k, v in ps]
print(reduce(groupByKey(m(None, words))))
    