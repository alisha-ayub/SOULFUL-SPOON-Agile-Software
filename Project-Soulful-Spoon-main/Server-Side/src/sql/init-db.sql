-- Create the Users table
CREATE TABLE IF NOT EXISTS Users (
    id INTEGER NOT NULL PRIMARY KEY,
    username TEXT NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    birthday DATE,
    password TEXT NOT NULL,
    confirmedPassword TEXT NOT NULL,
    email TEXT NOT NULL,
    Introduction TEXT,
    profilePicture TEXT
    
);


-- Create the Articles table

CREATE TABLE IF NOT EXISTS Articles (
    article_id INTEGER NOT NULL PRIMARY KEY,
    article_content TEXT NOT NULL,
    article_title TEXT NOT NULL,
    author_id INTEGER ,
    author_name TEXT NOT NULL,
    likes INTEGER,
    dislikes INTEGER,
    date_published DATE,
    image_path VARCHAR(255),
    FOREIGN KEY (author_id) REFERENCES Users(id)
   

   
);


DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
    comment_id INTEGER NOT NULL PRIMARY KEY,
    article_id INTEGER, 
    comment_content TEXT,
    commentor_id INTEGER,
    likes INTEGER,
    dislikes INTEGER,
    date_posted VARCHAR(50),
    nestedComment_content VARCHAR(249),
    nestedComment_id INTEGER

  
    );

-- Create the likes table
CREATE TABLE likes (
    like_id INTEGER NOT NULL PRIMARY KEY , -- Assuming SQLite, adjust for other databases\
    article_id Integer,
    likes INTEGER DEFAULT 0,
    dislikes INTEGER DEFAULT 0,
    FOREIGN KEY(article_id) REFERENCES Articles(article_id)
);

-- Insert initial values

-- FOR RECIPES PAGE AFTER CLICKING IMAGE
CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    image_path TEXT NOT NULL,
    link TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     message TEXT not NULL,
     date_sent TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
