--- Create Subscriber
INSERT INTO subscribers (subscriber_id, user_id)
VALUES (
    $1,
    $2
)
RETURNING *

---- Unsubscribe
 DELETE FROM subscribers WHERE subscriber_id = $1 AND user_id = $2