# FlowDesk-KafagyAli-MarketIndicatorApi


## Overview

The Market Indicator API provides real-time cumulative delta calculations for different trading pairs. As a market maker, understanding the current position in terms of cumulative delta helps in effective risk management by revealing whether actions like adjusting positions are necessary.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Examples](#examples)
- [Testing](#testing)
- [Kucoin-Documentation-links](#Kucoin-Documentation-links)
## Introduction

This project involves creating a REST API that tracks and returns the cumulative delta of a trading pair using trading data from the Kucoin exchange. The architecture project is designed to be easily extendible to other exchanges and trading pairs in the future. A middleware for checking the API key provided in the header has been added to demonstrate API key security.  

## Installation

To set up the Market Indicator API on your local machine, follow these steps:

```bash
git clone https://github.com/Tacoao/FlowDesk-KafagyAli-MarketIndicatorApi.git
cd FlowDesk-KafagyAli-MarketIndicatorApi
npm install
```
``You shouldn't rebuild the .ts files.``
## Usage

To start the server, run:

```bash
npm start
```

The API can then be accessed locally via:

```bash
http://localhost:3000/api/indicatorKucoin/{tradingPairSymbole}
```

Replace `{tradingPair}` with the desired trading pair symbole to fetch its cumulative delta.
On Kucoin the trading symbole follow this format: `BTC-EUR`
## Features

- **100 last trade data processing**: The API consumes trading data for the 100 last trade made and calculates the cumulative delta for the specified trading pair.
- **Extensible to multiple exchanges**: Initial support for the Kucoin exchange with the architecture designed to add more exchanges. Example: To add Binance, you should only create `endpoint->Controller->Service` in the same way as the Kucoin exchange.

## Dependencies

The project relies on the following main dependencies:

- **Node.js** and **Express** for the server framework.
- **Axios** for HTTP requests.
- **TypeScript** for type safety and scalability.
- **Jest** for the unit tests.
```json
{
  "@types/express": "^4.17.21",
  "@types/node": "^20.12.11",
  "axios": "^1.6.8",
  "express": "^4.19.2",
  "typescript": "^5.4.5",
  "@types/jest": "^29.5.12",
  "jest": "^29.7.0",
  "ts-jest": "^29.1.2"
}
```

## Configuration

The application uses TypeScript and Node.js settings which can be configured in the `tsconfig.json` and `package.json` files.

## Examples

### Requesting the Cumulative Delta for BTC-USD
Powershell:
```bash
$apiKey="apikey1"
$symbol="BTC-USDT"
$url="http://localhost:3000/api/indicatorKucoin/$symbol"
curl  $url -Headers @{"api-key"=$apiKey}
```
Unix Terminal:
```bash
apiKey="apikey1"
symbol="BTC-USDT"
url="http://localhost:3000/api/indicatorKucoin/$symbol"
curl -X GET $url -H "api-key: $apiKey"
```
Postman:
```bash
curl --location 'http://localhost:3000/api/indicatorKucoin/ETH-USDT' \
--header 'api-key: apikey1'
```
## Testing

Testing is done using Jest. Tests can be run with:

```bash
npm test
```
To simulate a real situation, a data sample of a Kucoin endpoint `https://api.kucoin.com/api/v1/market/histories?symbol=BTC-USDTresponse` has been extracted   to mock the data received by axios.get.
```json
    {
      "sequence": "7582035645585427",
      "price": "0.04840",
      "size": "0.0016219",
      "side": "sell",
      "time": 1715269411352000000
      },
      {
       "sequence": "7582035645585430",
       "price": "0.04840",
       "size": "0.0003522",
       "side": "sell",
       "time": 1715269411352000000
      },
      {
        "sequence": "7582035645585433",
        "price": "0.04840",
        "size": "0.0015326",
        "side": "sell",
        "time": 1715269411352000000
    }
```
I also noticed that when the Kucoin endpoint does not recognize the trading pair symbol, it returns an empty JSON data.
```json
{
    "code": "200000",
    "data": []
}
```
 Consequently, I treated this as an error.

```json
{
    "error": "The trading pair symbol does not exist"
}
```
## Kucoin-Documentation-links
- `Base-Url`:https://www.kucoin.com/docs/basic-info/base-url?x=l
- `end-point`:https://www.kucoin.com/docs/rest/spot-trading/market-data/get-trade-histories
