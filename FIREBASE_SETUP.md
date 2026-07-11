# GeoQuest V2 Firebase setup

The live application has **not** been connected yet. `script.js` still provides the current offline behavior until a real Firebase web configuration is supplied and migration is approved.

## Planned Firestore structure

- `students/{studentId}`: exact ID, full name, class, five topic scores, total, percentage, overall badge, topic badges, rank.
- `quizzes/{questionId}`: topic, question, four options, correct-answer reference, active status.
- `attempts/{attemptId}`: student ID, topic, answers, score, percentage, attempt number, completion status, timestamp.
- `badges/{badgeId}`: badge definitions, threshold, icon, description.
- `settings/scoring`: first/highest/latest rule, attempt limit, points, passing percentage.
- `rankings/{studentId}`: rank, total, percentage, badge summary, update timestamp.

## Create the Firebase project

1. Open the [Firebase console](https://console.firebase.google.com/) and select **Create a project**.
2. Name it something recognizable, such as `geoquest-basic-surveying-v2`.
3. Google Analytics is optional for this classroom application.
4. When the project opens, select the **Web** icon (`</>`) to register a web app.
5. Give the app a nickname such as `GeoQuest V2 Web`. Firebase Hosting does not need to be enabled because the site currently uses GitHub Pages.
6. Copy the generated `firebaseConfig` object. Do not send a service-account JSON or private admin key.

## Create Firestore

1. In Firebase Console, open **Build → Firestore Database**.
2. Select **Create database**.
3. Choose a region close to your users. The Firestore location cannot be changed later.
4. Start in **Production mode**.
5. Do not manually create collections yet; the migration will seed the exact 30-student roster.

## Enable lecturer authentication

1. Open **Build → Authentication → Get started**.
2. Under **Sign-in method**, enable **Email/Password**.
3. Under **Users**, create the lecturer account using the lecturer's email and a strong password.
4. Lecturer authorization will use a custom `lecturer: true` claim. Setting that claim requires a trusted Admin SDK environment; it must not be set in browser code.
5. Student quiz attempt writes will use Firebase Authentication separately (normally anonymous authentication or a controlled student sign-in). We will choose this after receiving your configuration.

## Authorized domains

In **Authentication → Settings → Authorized domains**, add:

```text
zuraiptsb-ui.github.io
```

Keep `localhost` available for local testing.

## Files prepared

- `firebase-config.example.js`: configuration placeholder.
- `firebase-service.js`: Firestore and Authentication adapter scaffold; not loaded by the pages yet.
- `firestore.rules`: public leaderboard reads and lecturer-protected writes.
- `firestore.indexes.json`: proposed attempt and ranking indexes.

## Information needed before integration continues

Send only the Firebase **web app configuration object** containing:

```js
{
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
}
```

Do not send lecturer passwords, service-account keys, private keys, refresh tokens, or API secrets.

## Next implementation phase

After configuration is supplied, the next phase will:

1. Create `firebase-config.js` locally.
2. Replace localStorage as the primary database with Firestore listeners and writes.
3. Migrate the exact 30-student roster and zero/default scores once.
4. Move lecturer access from the client-side PIN to Firebase email/password authentication.
5. Calculate and store ranking and badge fields consistently.
6. Test public real-time updates in separate browser sessions.
7. Deploy only after verification and explicit approval.

