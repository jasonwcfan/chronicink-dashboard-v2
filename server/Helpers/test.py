import sys
import json
import numpy
import math
import datetime

def main():
    data = json.loads(sys.stdin.readline())
    data['another'] = 'value2'
    print(json.dumps(data))



if __name__ == '__main__':
    main()
