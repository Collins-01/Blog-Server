



SELECT p.id AS id,  p.title AS title, p.description AS description p.background_image AS background_image,
    SUM(r.reaction = 'like') likes,
    SUM(r.reaction = 'love') love

    FROM posts p LEFT JOIN reaction r ON p.post_id = r.post_id

    GROUP BY p.post_id
