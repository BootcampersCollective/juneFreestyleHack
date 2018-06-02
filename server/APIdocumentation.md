# Wan2Date API Documentation

## Sign Up

#### Sign Up a New User Using Email

**Route to hit:**
<br/>*/signup*

**Type of route:**
<br/> POST

**Structure of Request:**

     {
            email: String,
            password: String
     };

#### Sign Up a New User Using Facebook

<p>We will get to this later.</p>

## Log In

**Route to hit:**
<br/>*/login*

**Type of route:**
<br/> POST

**Structure of Request:**

    {
            email: String,
            password: String
     };


## Profile Page

### Initial Response Information upon redirect to Profile

**Type of route:**
<br/> GET

**Structure of Response:**

     {
        id: String,
        name: String,
        location: String,
        gender: String,
        sexualPreference: String,
        isPopulated: Boolean
    }

### Update Profile Page Data

**Route to hit:**
<br/>*/profile*

**Type of route:**
<br/> POST

**Structure of Request:**

     {
        id: String,
        name: String,
        location: String,
        gender: String,
        sexualPreference: String, // 'male', 'female', 'nonbinary'
        isPopulated: Boolean
     }

**Structure of Response:**

    {
        id: String,
        name: String,
        location: String,
        gender: String,
        sexualPreference: String, // 'male', 'female', 'nonbinary'
        isPopulated: Boolean

    }

## Discover Page

### Initial Response Information upon redirect to Discover

**Type of route:**
<br/> GET

**Structure of Response:**

     [array of video URLs]


## Video Chat

<p>NOTE: The Video Chat is a work in progress as is still yet to be pushed to development.</p>
