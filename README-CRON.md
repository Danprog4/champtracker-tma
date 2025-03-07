# Daily Notification System for ChampTracker

This document explains how to set up the daily notification system for ChampTracker, which sends reminders to users who haven't been active on the current day.

## How It Works

The system uses a dedicated API endpoint that can be triggered by a cron job service to send notifications to users who haven't been active today.

### API Endpoint

The endpoint is located at:

```
/api/cron/daily-notifications
```

This endpoint:

1. Checks for authorization using a secret token
2. Retrieves all users from the database
3. For each user, checks if they haven't been active today
4. Sends a notification to eligible users
5. Returns statistics about the operation

## Setting Up the Cron Job

### 1. Environment Variables

Make sure to set the following environment variables:

```
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
CRON_SECRET=your_secret_token_for_cron_authorization
```

### 2. Setting Up with Vercel Cron Jobs

If you're hosting on Vercel, you can use Vercel Cron Jobs:

1. Add the following to your `vercel.json` file:

```json
{
  "crons": [
    {
      "path": "/api/cron/daily-notifications",
      "schedule": "0 9 * * *"
    }
  ]
}
```

This will trigger the endpoint every day at 9:00 AM UTC.

### 3. Setting Up with External Cron Service

If you're using an external cron service like cron-job.org, EasyCron, or GitHub Actions:

1. Set up a job to make an HTTP request to your endpoint:

```
https://your-domain.com/api/cron/daily-notifications
```

2. Add the authorization header:

```
Authorization: Bearer your_secret_token_for_cron_authorization
```

3. Schedule it to run daily at an appropriate time (e.g., 9:00 AM in your target timezone)

## Testing

You can test the endpoint by making a manual request:

```bash
curl -X GET https://your-domain.com/api/cron/daily-notifications \
  -H "Authorization: Bearer your_secret_token_for_cron_authorization"
```

The response should include statistics about sent notifications.

## Troubleshooting

If notifications aren't being sent:

1. Check the server logs for any errors
2. Verify that the `TELEGRAM_BOT_TOKEN` and `CRON_SECRET` are set correctly
3. Make sure the cron job is running at the expected time
4. Check that users have the correct `lastActiveDate` in the database
