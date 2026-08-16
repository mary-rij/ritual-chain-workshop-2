# Detailed Notes from Bootcamp Level 2

## 1. Market Creation
createMarket accepts human-readable durations in seconds.  
Internally it converts them to block numbers using the measured block time.  
It also books three future calls with the Scheduler in one transaction.

## 2. Betting
Simple mapping of user → stake for YES and NO.  
Betting is only allowed before the close block.

## 3. Resolution
onScheduledResolve is the heart of the system.  
It:
- Selects an executor
- Performs the HTTP call
- Runs jq
- Compares the result
- Updates market state
- Cancels remaining scheduled calls if successful

## 4. Failure Handling
Any problem (non-200, decode error, executor error, etc.) counts as a failed attempt.  
After three failures the market becomes Invalid and everyone can withdraw their original stake.

## 5. Claiming
claimWinnings calculates the user’s share with simple integer math.  
No loops over all participants, so gas stays predictable.

## Personal Conclusion
The design is clean, safe and truly autonomous.  
I now understand how Ritual’s native features enable this kind of application.  
Code is ready for mainnet.
