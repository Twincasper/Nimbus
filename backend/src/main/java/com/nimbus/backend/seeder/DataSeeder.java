package com.nimbus.backend.seeder;

import com.nimbus.backend.model.User;
import com.nimbus.backend.model.Category;
import com.nimbus.backend.model.Post;
import com.nimbus.backend.model.Comment;
import com.nimbus.backend.model.Like;
import com.nimbus.backend.repository.UserRepository;
import com.nimbus.backend.repository.CategoryRepository;
import com.nimbus.backend.repository.PostRepository;
import com.nimbus.backend.repository.CommentRepository;
import com.nimbus.backend.repository.LikeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final LikeRepository likeRepository;

    @Autowired
    public DataSeeder(UserRepository userRepository,
                      CategoryRepository categoryRepository,
                      PostRepository postRepository,
                      CommentRepository commentRepository,
                      LikeRepository likeRepository) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.likeRepository = likeRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        seedUsers();
        seedCategories();
        seedPostsAndComments();
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            User user1 = new User();
            user1.setUsername("sunnyDaze");
            user1.setPasswordHash("12345678"); // for testing, use a proper password encoder in production
            user1.setPronouns("he/him");
            user1.setProfilePicture("https://example.com/images/sunny.jpg");

            User user2 = new User();
            user2.setUsername("moonlightMia");
            user2.setPasswordHash("12345678");
            user2.setPronouns("she/her");
            user2.setProfilePicture("https://example.com/images/moonlight.jpg");

            User user3 = new User();
            user3.setUsername("midnightSam");
            user3.setPasswordHash("12345678");
            user3.setPronouns("they/them");
            user3.setProfilePicture("https://example.com/images/midnight.jpg");

            User user4 = new User();
            user4.setUsername("calmChloe");
            user4.setPasswordHash("12345678");
            user4.setPronouns("she/her");
            user4.setProfilePicture("https://example.com/images/calm.jpg");

            userRepository.saveAll(Arrays.asList(user1, user2, user3, user4));
        }
    }

    private void seedCategories() {
        if (categoryRepository.count() == 0) {
            Category depression = new Category();
            depression.setName("Depression");
            depression.setDescription("A supportive community for those experiencing depression. Share your feelings, coping methods, and find understanding.");

            Category anxiety = new Category();
            anxiety.setName("Anxiety");
            anxiety.setDescription("Discuss anxiety, share tips for managing panic attacks, and support others dealing with anxiety.");

            Category stress = new Category();
            stress.setName("Stress Management");
            stress.setDescription("Discuss ways to deal with stress in a healthy way, share mindfulness techniques, and motivational tips.");

            Category bipolar = new Category();
            bipolar.setName("Bipolar & Mood Disorders");
            bipolar.setDescription("A community for those managing mood swings and bipolar disorders. Share experiences, treatments, and support each other.");

            categoryRepository.saveAll(Arrays.asList(depression, anxiety, stress, bipolar));
        }
    }

    private void seedPostsAndComments() {
        if (postRepository.count() == 0) {
            // Retrieve existing users and categories from the database
            List<User> users = userRepository.findAll();
            List<Category> categories = categoryRepository.findAll();
            if (users.isEmpty() || categories.isEmpty()) {
                return;
            }
            User sunny = users.stream().filter(u -> u.getUsername().equals("sunnyDaze")).findFirst().orElse(users.get(0));
            User mia = users.stream().filter(u -> u.getUsername().equals("moonlightMia")).findFirst().orElse(users.get(0));
            User sam = users.stream().filter(u -> u.getUsername().equals("midnightSam")).findFirst().orElse(users.get(0));
            User chloe = users.stream().filter(u -> u.getUsername().equals("calmChloe")).findFirst().orElse(users.get(0));

            // Create posts in appropriate categories
            Category depression = categories.stream().filter(c -> c.getName().equals("Depression")).findFirst().orElse(categories.get(0));
            Category anxiety = categories.stream().filter(c -> c.getName().equals("Anxiety")).findFirst().orElse(categories.get(0));
            Category stress = categories.stream().filter(c -> c.getName().equals("Stress Management")).findFirst().orElse(categories.get(0));
            Category bipolar = categories.stream().filter(c -> c.getName().equals("Bipolar & Mood Disorders")).findFirst().orElse(categories.get(0));

            Post post1 = new Post();
            post1.setTitle("Feeling overwhelmed lately");
            post1.setBody("<p><strong>Hi everyone,</strong> I've been feeling really down and overwhelmed with my daily routine. Sometimes it feels like nothing will ever improve.</p><p>Any advice on managing these feelings?</p>");
            post1.setUser(sunny);
            post1.setCategory(depression);
            post1.setCreatedAt(LocalDateTime.now());
            postRepository.save(post1);

            Post post2 = new Post();
            post2.setTitle("Anxiety attacks making life hard");
            post2.setBody("<p>I experience anxiety attacks several times a week, and it's affecting my work and personal life. <em>Any tips</em> on coping with sudden panic?</p><ul><li>Meditation</li><li>Deep breathing</li></ul>");
            post2.setUser(mia);
            post2.setCategory(anxiety);
            post2.setCreatedAt(LocalDateTime.now());
            postRepository.save(post2);

            Post post3 = new Post();
            post3.setTitle("Managing stress through mindfulness");
            post3.setBody("<p>I've been experimenting with mindfulness and meditation to manage stress. Sharing my journey, in case anyone wants to try:</p><ol><li>Meditate for 10 minutes</li><li>Practice gratitude</li><li>Stay active</li></ol>");
            post3.setUser(chloe);
            post3.setCategory(stress);
            post3.setCreatedAt(LocalDateTime.now());
            postRepository.save(post3);

            Post post4 = new Post();
            post4.setTitle("Mood swings and coping strategies");
            post4.setBody("<p>Living with bipolar disorder means dealing with intense mood swings. <strong>Sharing my coping strategies:</strong></p><p><em>Therapy, medication, and a strong support system</em> have been crucial for me.</p>");
            post4.setUser(sam);
            post4.setCategory(bipolar);
            post4.setCreatedAt(LocalDateTime.now());
            postRepository.save(post4);

            // Create comments that are supportive and relevant to each post
            Comment comment1 = new Comment();
            comment1.setBody("I totally understand. It helps me to talk to someone who gets it. Sending virtual hugs.");
            comment1.setUser(mia);
            comment1.setPost(post1);
            comment1.setCreatedAt(Instant.now());
            commentRepository.save(comment1);

            Comment comment2 = new Comment();
            comment2.setBody("Have you tried deep breathing exercises? They help me calm my mind during an attack.");
            comment2.setUser(sam);
            comment2.setPost(post2);
            comment2.setCreatedAt(Instant.now());
            commentRepository.save(comment2);

            Comment comment3 = new Comment();
            comment3.setBody("Mindfulness really changed my perspective. Keep at it!");
            comment3.setUser(sunny);
            comment3.setPost(post3);
            comment3.setCreatedAt(Instant.now());
            commentRepository.save(comment3);

            Comment comment4 = new Comment();
            comment4.setBody("Thank you for sharing your experience—it's very inspiring and supportive.");
            comment4.setUser(chloe);
            comment4.setPost(post4);
            comment4.setCreatedAt(Instant.now());
            commentRepository.save(comment4);

            // Seed a few likes for each post to simulate engagement
            // For post1, liked by mia and sam
            Like like1 = new Like();
            like1.setPost(post1);
            like1.setUser(mia);
            like1.setCreatedAt(Instant.now());

            Like like2 = new Like();
            like2.setPost(post1);
            like2.setUser(sam);
            like2.setCreatedAt(Instant.now());

            // For post2, liked by sunny and chloe
            Like like3 = new Like();
            like3.setPost(post2);
            like3.setUser(sunny);
            like3.setCreatedAt(Instant.now());

            Like like4 = new Like();
            like4.setPost(post2);
            like4.setUser(chloe);
            like4.setCreatedAt(Instant.now());

            // For post3, liked by sunny, mia and sam
            Like like5 = new Like();
            like5.setPost(post3);
            like5.setUser(sunny);
            like5.setCreatedAt(Instant.now());

            Like like6 = new Like();
            like6.setPost(post3);
            like6.setUser(mia);
            like6.setCreatedAt(Instant.now());

            Like like7 = new Like();
            like7.setPost(post3);
            like7.setUser(sam);
            like7.setCreatedAt(Instant.now());

            // For post4, liked by sunny, mia, and chloe
            Like like8 = new Like();
            like8.setPost(post4);
            like8.setUser(sunny);
            like8.setCreatedAt(Instant.now());

            Like like9 = new Like();
            like9.setPost(post4);
            like9.setUser(mia);
            like9.setCreatedAt(Instant.now());

            Like like10 = new Like();
            like10.setPost(post4);
            like10.setUser(chloe);
            like10.setCreatedAt(Instant.now());

            likeRepository.saveAll(Arrays.asList(like1, like2, like3, like4, like5, like6, like7, like8, like9, like10));
        }
    }
}
