// Script to add eli5 fields to all phase JSON files
const fs = require("fs");
const path = require("path");

const eli5Map = {
  // Phase 1: Mathematics
  "linear-algebra":
    "Imagine you have a grid of numbers, like a spreadsheet. Linear algebra is the math of working with these grids (called matrices). Think of it like this: when you resize a photo, you're doing linear algebra! You're telling the computer 'make every pixel's position 2x bigger.' AI uses these number grids EVERYWHERE — every image is a grid of pixel numbers, every sentence becomes a grid of word-numbers. It's like the alphabet of AI math — without it, AI can't read or write anything!",
  calculus:
    "Imagine you're rolling a ball down a bumpy hill and you want to find the lowest valley. Calculus helps you figure out which direction is 'downhill' at any point. That's literally how AI learns! It starts with random guesses, checks 'am I getting warmer or colder?', and slides downhill toward the right answer. The 'slope' tells you how steep the hill is and which way to go. Derivatives (slopes) are the heart of how neural networks learn from their mistakes — they follow the slope to get better and better.",
  "probability-statistics":
    "Probability is just asking 'how likely is this?' If you flip a coin, there's a 50-50 chance of heads. AI uses probability ALL the time — when your email app says 'this is 95% likely spam,' that's probability! Statistics is about looking at lots of data and finding patterns. If 8 out of 10 people who bought diapers also bought baby wipes, that's a statistic that helps stores decide what to put on sale. AI is basically a super-powered pattern-finder using statistics.",
  optimization:
    "Imagine you're trying to find the best recipe for cookies. You try different amounts of sugar, butter, and flour, tasting each batch. Optimization is doing this smartly instead of randomly — each time you adjust just a little based on what tasted better or worse. AI does the same thing: it has 'knobs' (parameters) it can turn, and optimization is the process of turning those knobs until the AI's answers are as good as possible. Gradient descent is just 'always walk downhill until you reach the bottom.'",
  "information-theory":
    "Imagine you're playing 20 Questions. Some questions are really good ('Is it alive?') because they cut the possibilities in half. Others are bad ('Is it a blue penguin named Steve?'). Information theory measures how 'informative' a question or piece of data is. Entropy is just 'how surprised are you?' — a coin flip has high entropy (you really don't know what's coming), while sunrise tomorrow has low entropy (you're not surprised at all). AI uses this to decide which features give the most useful information.",

  // Phase 2: Data Handling
  numpy:
    "NumPy is like a super-fast calculator for working with huge lists of numbers. Normally, if you wanted to add 1 to a million numbers, you'd have to do it one by one. NumPy does it ALL AT ONCE — zoom! It's like the difference between washing dishes one at a time vs. putting them all in a dishwasher. Every AI tool uses NumPy under the hood because AI needs to crunch millions of numbers really fast. Arrays (lists of numbers) and matrices (grids of numbers) are NumPy's specialty.",
  pandas:
    "Pandas is like Excel, but way more powerful and you control it by typing instead of clicking. It lets you load huge tables of data, filter rows, sort columns, fill in missing values, and combine different tables together. Imagine you have a spreadsheet of every movie ever made with ratings, actors, and budgets — Pandas lets you ask questions like 'show me all movies rated above 8.0 that cost less than $10 million' in one line of code. Almost every data science project starts with Pandas.",
  "data-visualization":
    "Data visualization is drawing pictures with your data. Instead of staring at thousands of numbers, you make charts and graphs that let you SEE patterns. It's like the difference between reading a list of every city's temperature vs. looking at a weather map with colors. A bar chart might show you which product sells the most, a scatter plot reveals if taller people tend to weigh more, and a heatmap shows exactly where people click on a website. Pictures tell stories that numbers alone can't.",
  "data-cleaning":
    "Real-world data is MESSY — like a room after a party. Some information is missing (empty cells), some is wrong (someone typed 'banana' in an age field), some is duplicated (same record entered twice), and formats are inconsistent ('Jan 5' vs '1/5/2024' vs '2024-01-05'). Data cleaning is tidying up this mess before feeding it to AI. It's like washing and chopping vegetables before cooking — if you skip it, your dish (or AI model) will taste terrible. Data scientists spend about 80% of their time cleaning data!",
  "feature-engineering":
    "Feature engineering is being creative about HOW you describe things to an AI. Imagine teaching someone to predict house prices. You could just say 'this house is at 123 Main St' — not very helpful. But if you say 'it's 2,000 sq ft, has 3 bedrooms, is 0.5 miles from the train station, and was built in 1990' — now they can make a smart guess! Feature engineering is turning raw information into useful clues that help AI learn better. It's the 'art' part of data science.",
  "exploratory-data-analysis":
    "EDA is being a detective with your data before you build anything. You look at your data from every angle — how big is it? What do the numbers look like? Are there weird outliers? What patterns jump out? It's like when you dump out a puzzle box and first sort the pieces by color and edge pieces before you start assembling. You ask questions: 'Do richer neighborhoods have more parks?' 'Is there a pattern in when people buy ice cream?' This detective work guides your entire project.",
  "data-formats":
    "Data comes in different containers, just like drinks come in bottles, cans, and cartons. CSV files are like simple spreadsheets. JSON is like a tree of labeled boxes — great for nested info like 'address → city → name'. Databases (SQL) are like super-organized filing cabinets that millions of people can access at once. APIs are like waiters — you ask for data from another service and they bring it to you. Knowing which container to use and how to open each one is essential for getting data into your AI projects.",

  // Phase 3: ML Fundamentals
  "ml-overview":
    "Machine Learning is teaching computers to learn from examples instead of giving them exact rules. Imagine teaching a kid to recognize dogs: you don't explain every possible dog — you show them hundreds of dog pictures and they figure out the pattern! That's ML. Supervised learning is like a teacher showing flashcards with answers. Unsupervised learning is like giving a kid a pile of toys and saying 'sort these however you want.' Reinforcement learning is like training a puppy — good behavior gets treats, bad behavior doesn't.",
  regression:
    "Regression is predicting a number. 'How much will this house sell for?' 'What temperature will it be tomorrow?' 'How many views will this video get?' You draw a line (or curve) through your past data points, and then use that line to predict future numbers. Linear regression is literally drawing the best straight line through dots on a graph — the line that's closest to all the dots. It's one of the simplest but most useful tools in all of data science.",
  classification:
    "Classification is teaching AI to put things into categories. 'Is this email spam or not spam?' 'Is this photo a cat, dog, or bird?' 'Will this customer leave or stay?' It's like having a super-fast sorter. You show the AI thousands of examples with the right labels, and it learns the patterns. Then when it sees something new, it can say 'this looks like a cat to me!' Spam filters, disease diagnosis, fraud detection — they're all classification problems.",
  clustering:
    "Clustering is like sorting a jar of mixed candy by type WITHOUT knowing what types exist. The AI looks at the candy and says 'okay, these round red ones seem similar, these long green ones go together, and these small brown ones are their own group.' Nobody told it the categories — it discovered them! Companies use clustering to find groups of similar customers, astronomers use it to discover types of galaxies, and Spotify uses it to group similar songs together for playlists.",
  "model-evaluation":
    "Model evaluation is like grading a test. Your AI studied (training), now you give it a test on NEW questions it hasn't seen. How many does it get right? But it's not just about the overall score — you need to know: does it miss important things (like failing to catch a disease)? Does it cry wolf too often (flagging normal emails as spam)? Accuracy, precision, recall — these are different ways of grading that tell you different things about HOW your AI is wrong, not just how often.",
  "ensemble-methods":
    "Imagine you're on a game show and can't decide the answer. But you have 100 friends in the audience, each making their own guess. If 80 of them pick option B, that's probably right! Ensemble methods do this with AI models — instead of trusting one model, you build many models and let them vote. Random Forest is literally 100+ decision trees voting together. Boosting is like each new model focusing specifically on the questions the previous models got wrong. Teams almost always beat individuals!",
  "sklearn-practical":
    "Scikit-learn is like a Swiss Army knife for AI. It has tools for almost every basic ML task — classification, regression, clustering, data preprocessing — all in a consistent, easy-to-use package. Instead of coding algorithms from scratch, you import them, call .fit() to train, and .predict() to get answers. It's like having a toolbox where every tool works the same way: pick it up, point it at the problem, press the button. It's where almost every ML beginner starts.",
  "ml-workflow":
    "Building an ML project is like cooking a full meal. You don't just throw ingredients in a pot — you plan the menu (define the problem), shop for ingredients (collect data), wash and chop everything (clean data), follow the recipe (train the model), taste-test (evaluate), adjust seasoning (tune), and finally serve it (deploy). Each step matters. Skipping data cleaning is like using unwashed vegetables. Not evaluating properly is like serving without tasting. This workflow is what separates hobby projects from real solutions.",

  // Phase 4: Deep Learning
  "neural-networks-fundamentals":
    "A neural network is inspired by how your brain works. Your brain has billions of tiny cells (neurons) connected by wires (synapses). When you see a cat, certain neurons fire in a chain reaction until your brain says 'cat!' Artificial neural networks do the same with math — numbers flow through layers of fake neurons, each one doing a tiny calculation. The magic is that by adjusting the 'strength' of each connection, the network learns! It's like a chain of dominos where you can make each domino push harder or softer.",
  "tensorflow-pytorch":
    "TensorFlow and PyTorch are like the power tools of AI — if scikit-learn is a hand drill, these are industrial-grade machines. They let you build custom neural networks of any shape and size, and they use your GPU (graphics card) to do math incredibly fast. Think of them as LEGO Technic vs. regular LEGO — you can build much more complex and powerful things. PyTorch is like sketching freely (great for research), while TensorFlow is like using an architecture blueprint (great for production). Most AI breakthroughs use one of these two.",
  "convolutional-neural-networks":
    "CNNs are how AI 'sees.' When you look at a photo, your brain first notices edges, then shapes, then objects. CNNs work the same way! The first layer detects edges, the next detects corners and textures, deeper layers detect eyes and wheels, and the final layers say 'that's a face' or 'that's a car.' It's like using a magnifying glass that slides across the whole image, looking for patterns. That's why your phone can recognize faces and self-driving cars can spot pedestrians.",
  "recurrent-neural-networks":
    "RNNs are for data that comes in sequences — like words in a sentence, notes in a song, or stock prices over time. Regular neural networks see everything at once, but RNNs have memory — they remember what came before. It's like reading a book: the word 'bank' means different things depending on whether the previous sentence talked about money or rivers. RNNs read one word at a time and remember the story so far, which helps them understand context.",
  "transformers-attention":
    "Transformers are the technology behind ChatGPT, Google Translate, and almost every modern AI. The breakthrough idea is 'attention' — instead of reading a sentence word-by-word like RNNs, transformers look at ALL words at once and figure out which words are most related. In 'The cat sat on the mat because it was tired,' attention helps the AI understand that 'it' refers to 'cat' not 'mat.' It's like reading a paragraph and instantly highlighting the most important connections.",
  "generative-models":
    "Generative AI creates NEW things that never existed — new images, new text, new music. GANs work like an art forger vs. a detective: one network creates fake art, the other tries to catch it, and they both get better until the fakes are indistinguishable from real art. VAEs are like compressing a photo to a tiny file, then rebuilding it — the compressed version captures the 'essence.' Diffusion models (DALL-E, Midjourney) work like un-smearing a blurry photo, step by step, from pure noise to a beautiful image.",
  "training-techniques":
    "Training a deep learning model is like tuning a race car. Learning rate is how big your adjustments are — too big and you overshoot, too small and you take forever. Batch size is how many examples you look at before adjusting. Dropout is randomly ignoring some neurons during training so the network doesn't get lazy. Batch normalization keeps the numbers from getting too big or small. These 'tricks' are the difference between a model that learns in hours vs. one that never works at all.",
  "transfer-learning":
    "Transfer learning is like a pianist learning to play guitar — they don't start from zero because they already understand music, rhythm, and melody. Similarly, an AI trained on millions of images already 'understands' edges, textures, and shapes. You take this pre-trained AI and teach it YOUR specific task (like identifying dog breeds) with just a few hundred examples instead of millions. It's recycling knowledge! This is why modern AI can learn new tasks so quickly — it doesn't start from scratch.",

  // Phase 5: NLP
  "nlp-text-preprocessing":
    "Text preprocessing is preparing messy human language for a computer. Computers don't understand words — they only understand numbers. So you have to turn words into numbers! First you clean up: remove extra spaces, fix typos, make everything lowercase. Then you break sentences into words ('tokenization' — like cutting a sentence into word cards). Then you convert words to numbers ('the' = 42, 'cat' = 1337). It's like translating human language into a secret number code that computers can work with.",
  "transformers-llms":
    "Large Language Models are AI systems that have read virtually the entire internet and learned patterns in human language. They're like incredibly well-read students who can continue any sentence, answer questions, write essays, and even code. The 'transformer' architecture lets them understand context — when you say 'apple' after talking about phones, they know you mean the company, not the fruit. GPT, Claude, and Gemini are all LLMs. They don't truly 'understand' — they're incredibly sophisticated pattern-completion machines.",
  "huggingface-ecosystem":
    "Hugging Face is like an app store for AI. Instead of building AI models from scratch (which costs millions), you can download pre-trained models that are already smart. Need a text summarizer? Download one. Need a translator? There's one ready. Need an image captioner? Grab it. It's like going to a library instead of writing every book yourself. They also have datasets, training tools, and a community sharing their work. It's the single most important platform for practical AI development today.",
  "nlp-applications":
    "NLP applications are all the useful things AI can do with language. Sentiment analysis reads a product review and tells you if the person is happy or angry. Named entity recognition spots names, places, and dates in text. Machine translation converts between languages. Question answering reads a document and answers your questions about it. Summarization condenses a long article into a short paragraph. You use NLP applications every day — autocorrect, email suggestions, voice assistants, and search engines.",
  "prompt-engineering":
    "Prompt engineering is the art of asking AI the right questions. Imagine you have a genius friend who takes everything literally. If you ask 'write something about dogs,' you get something random. But if you ask 'write a 3-paragraph essay about why golden retrievers make great family pets, using a warm and friendly tone, with specific examples' — you get exactly what you want. The WAY you ask determines the quality of the answer. It's like giving clear directions vs. vague ones. This skill makes AI 10x more useful.",
  "langchain-agents":
    "LangChain lets you give AI tools and superpowers beyond just chatting. Normally, ChatGPT can only talk — it can't actually browse the web, run code, or check your email. LangChain connects the AI 'brain' to real tools: 'search Google for X', 'look up this in the database', 'send this email.' AI Agents are even cooler — they can plan multi-step tasks: 'To answer this question, I need to first search the web, then read the article, then summarize it.' It's like giving the AI hands to actually DO things instead of just talking.",
  "advanced-nlp":
    "Advanced NLP tackles the really hard problems in language AI. Multi-lingual models understand 100+ languages at once. Zero-shot learning means the AI can do tasks it was NEVER trained for — like classifying news articles into categories it's never seen. Retrieval-Augmented Generation (RAG) lets AI search through YOUR documents before answering, so it doesn't just make things up. These techniques push AI from 'cool demo' to 'actually reliable for real work.'",

  // Phase 6: Computer Vision
  "opencv-image-processing":
    "OpenCV is like Photoshop for programmers — but instead of clicking buttons, you write code to manipulate images. You can blur, sharpen, resize, rotate, detect edges, and find faces in photos automatically. Imagine writing a script that processes 10,000 security camera frames per second, detecting motion and highlighting moving objects. That's OpenCV! It's the foundation before deep learning — understanding how images work as grids of numbers (pixels) where each pixel has color values (like RGB 255, 128, 0 for orange).",
  "object-detection":
    "Object detection is teaching AI to find and label things in pictures. Not just 'this is a photo of a street,' but drawing a box around each car, each person, each traffic light, and labeling them all. Self-driving cars use this every millisecond to spot pedestrians, other cars, and stop signs. Your phone uses it to detect faces for portrait mode. Amazon Go stores use it to track which products you pick up. YOLO (You Only Look Once) is a famous model that does this in real-time.",
  "image-segmentation":
    "Segmentation goes beyond drawing boxes — it colors in EVERY PIXEL of an object. Instead of a box around a cat, it outlines the exact cat shape, pixel by pixel. It's like using a magic wand tool in Photoshop that perfectly selects the cat. Medical AI uses this to outline tumors in brain scans (pixel by pixel = very precise). Self-driving cars use it to understand 'road' vs. 'sidewalk' vs. 'sky' for every pixel in their camera view.",
  "image-generation":
    "Image generation AI creates pictures from nothing — or transforms existing ones. Stable Diffusion and DALL-E start with pure TV static (random noise) and gradually remove noise until a beautiful image appears, guided by your text description. It's like sculpting: you start with a block of marble (noise) and chip away until a statue (image) appears. Style transfer can make your photo look like a Van Gogh painting. Super-resolution can make blurry photos sharp. It's like magic, but it's math!",
  "vision-transformers":
    "Vision Transformers (ViTs) took the same 'attention' trick that made ChatGPT understand language and applied it to seeing images. Instead of reading words, ViTs chop an image into small squares (patches), like a jigsaw puzzle. Then the attention mechanism figures out which patches are related — like connecting the wheel patches to understand 'car.' This approach actually beats the traditional CNN approach on many tasks and is the foundation of modern multi-modal AI (systems that understand both text AND images).",
  "cv-applications":
    "Computer Vision applications are everywhere in the real world. Medical imaging AI detects cancer in X-rays sometimes better than doctors. Agricultural drones use CV to spot diseased crops from the air. Sports analytics track every player's movement. AR filters on Instagram map your face in real-time. Quality inspection AI on factory lines spots defective products. Autonomous vehicles understand their entire environment through cameras. Every industry is being transformed by teaching computers to see.",

  // Phase 7: Reinforcement Learning
  "rl-fundamentals":
    "Reinforcement Learning is how you train a puppy — or a game-playing AI. The AI (agent) tries stuff in an environment, and gets rewards for good actions and penalties for bad ones. Over time, it figures out the best strategy. Imagine learning a video game with no instructions — you press buttons, sometimes you score points, sometimes you die. Eventually you learn the winning strategy just from the rewards! That's RL. The AI explores, makes mistakes, learns from consequences, and improves. It's the closest thing to how humans learn from experience.",
  "deep-rl":
    "Deep RL combines neural networks with reinforcement learning to handle incredibly complex situations. Regular RL works great for simple games, but what about a game with millions of possible states, like chess or StarCraft? The neural network acts as the 'brain' that looks at the game screen (or state) and decides the best move. DQN was the first to play Atari games at superhuman levels just from looking at pixels. It's like giving the puppy a brain that can handle much more complex tricks.",
  "alphago-game-ai":
    "AlphaGo was the AI that defeated the world champion at Go — a game so complex that there are more possible positions than atoms in the universe. Nobody thought AI could win for decades. AlphaGo combined deep learning (learning from human expert games) with reinforcement learning (playing millions of games against itself). AlphaZero went even further — it learned ONLY by playing itself, with zero human knowledge, and became the best at chess, Go, AND shogi. It's like a kid who learns to play chess just by playing against a mirror, and becomes the world champion.",
  "robotics-rl":
    "Teaching robots through RL is like teaching a toddler to walk. The robot tries random movements, falls down a lot, but slowly learns what works. With simulations, robots can practice millions of times in a virtual world before trying it for real — like learning to swim in VR before jumping in a pool! Boston Dynamics' robots, warehouse pick-and-place arms, and drone navigation all use RL. The challenge is that real-world physics is messy — what works in simulation doesn't always transfer perfectly to reality.",
  "rl-implementations":
    "Implementing RL is about getting your hands dirty with actual coding. You use tools like OpenAI Gym (now Gymnasium) that give you virtual environments — like simple video games — where your AI agent can practice. It's like a playground for training AI. You start by solving simple tasks (balance a pole, navigate a maze) before tackling complex ones (play Atari, control a robot arm). Libraries like Stable Baselines3 give you pre-built RL algorithms so you don't have to code everything from scratch.",
  "multi-agent-rl":
    "Multi-agent RL is when multiple AIs interact with each other — cooperating, competing, or both. Imagine training an AI soccer team where each player-AI must learn to pass, defend, and score while coordinating with teammates. Or training AI traders in a stock market where each one's actions affect the others. It's like the difference between solitaire (single agent) and poker (multi-agent). This is where really interesting behaviors emerge — AIs develop strategies, bluff, and even learn to communicate!",

  // Phase 8: MLOps
  "model-serialization":
    "Model serialization is saving your trained AI to a file so you can use it later without retraining. Training a model might take hours or days — you don't want to redo that every time! It's like saving a video game. You pickle (save) the model's learned knowledge into a file, and later you unpickle (load) it back. Different formats exist: pickle for Python objects, ONNX for sharing between tools, SavedModel for TensorFlow. It's the step between 'my model works in my notebook' and 'anyone can use my model.'",
  "api-deployment":
    "API deployment is putting your AI on the internet so apps can use it. You wrap your model in a web server (using FastAPI or Flask), and anyone can send data to it and get predictions back. It's like a vending machine: you put in a request ('Is this email spam?'), press a button, and get an answer back ('99% spam!'). Netflix's recommendation model, Google Translate, and ChatGPT all work this way — your app sends a request over the internet, the AI server processes it, and sends back the result.",
  "docker-containers":
    "Docker is like a shipping container for your software. A shipping container works on any ship, truck, or train — same idea with Docker. You pack your AI code, its dependencies, and its configuration into a 'container,' and it works identically on any machine — your laptop, your colleague's computer, or a cloud server. No more 'it works on my machine!' problems. It's like putting your entire kitchen (ingredients, recipes, tools) into a portable box that works the same way everywhere you open it.",
  "ml-pipelines":
    "ML pipelines automate the entire AI workflow — from raw data to deployed model — so it runs without human intervention. Imagine a factory assembly line: data comes in, gets cleaned, features are created, the model trains, gets evaluated, and gets deployed — all automatically. Without pipelines, a data scientist would have to manually run each step every time the data updates. With pipelines, it's like setting up dominoes — kick off the first one and everything else follows automatically, every day, reliably.",
  "experiment-tracking":
    "Experiment tracking is keeping a detailed lab notebook for your AI experiments. When you train 100 different models with different settings (learning rate, batch size, architecture), you need to remember what you tried and what worked. Tools like MLflow and Weights & Biases automatically log every experiment — the settings, the results, the graphs, even the code version. It's like a fitness app that tracks every workout. Without it, you'll say 'that model I trained 3 weeks ago was great... but what settings did I use?' and have no idea.",
  "model-monitoring":
    "Model monitoring is watching your deployed AI to make sure it doesn't go bad over time. A spam filter trained in 2023 might stop working in 2024 because spammers change their tactics. This is called 'model drift' — the world changes but your model doesn't. Monitoring watches for drops in accuracy, unusual predictions, or shifts in incoming data. It's like a smoke detector for your AI — it alerts you before things go wrong. Without monitoring, your AI could be giving terrible predictions for months before anyone notices.",
  "cloud-deployment":
    "Cloud deployment is running your AI on powerful computers owned by Amazon (AWS), Google (GCP), or Microsoft (Azure) instead of your own machine. It's like renting a warehouse instead of storing everything in your garage. The cloud gives you as many GPUs as you need, scales up when lots of users hit your AI, and scales down when nobody's using it — so you only pay for what you use. Services like SageMaker (AWS) and Vertex AI (GCP) are specifically designed to make deploying ML models easier.",

  // Phase 9: Specializations
  "time-series":
    "Time series is data that changes over time — stock prices, temperature readings, website traffic, heart rate monitors. The key insight is that WHEN something happens matters as much as WHAT happens. If ice cream sales go up every summer, you can predict next summer's sales! But it's tricky because time data has special patterns: trends (going up over years), seasonality (up every summer), and cycles (recessions every ~10 years). Time series models learn these patterns to predict the future.",
  "recommender-systems":
    "Recommender systems are the AI behind 'you might also like...' on Netflix, Amazon, YouTube, and Spotify. There are two main approaches: (1) 'People who liked X also liked Y' (collaborative filtering — finding people similar to you), and (2) 'Since you like action movies with robots, here's another action movie with robots' (content-based — matching features). It's like having a friend who knows your taste perfectly and always suggests great movies. The better the recommendations, the more time you spend on the platform.",
  "graph-neural-networks":
    "Graph Neural Networks work on connected data — social networks, molecules, maps, citation networks. Regular AI sees tables and images, but GNNs see relationships. In a social network, each person is a dot (node) and each friendship is a line (edge). GNNs can learn patterns like 'people who are friends-of-friends tend to become friends.' In chemistry, atoms are dots and bonds are lines — GNNs can predict if a new molecule will be a good medicine. It's AI for data that looks like a web of connections.",
  "explainable-ai":
    "Explainable AI is about making AI show its work, like a math test where you can't just write the answer. When an AI denies someone a loan, we need to know WHY. Was it their income? Their zip code? (That could be illegal discrimination.) Techniques like SHAP and LIME reveal which factors mattered most. It's like asking a doctor 'why did you prescribe this medicine?' instead of blindly trusting them. As AI makes more important decisions, explainability isn't just nice-to-have — it's often legally required.",
  automl:
    "AutoML is AI that builds AI. Instead of a human expert trying hundreds of different model configurations, AutoML automatically searches for the best one. It's like a robot chef that tries every possible recipe combination and finds the tastiest one. Tools like Google AutoML, Auto-sklearn, and TPOT can automatically select the best algorithm, tune the settings, and pick the best features. It doesn't replace data scientists (you still need to understand the problem), but it automates the tedious trial-and-error part.",
  "multimodal-ai":
    "Multimodal AI understands multiple types of input at once — text, images, audio, video. Humans are naturally multimodal (you see AND hear a movie), but most AI was limited to one type. GPT-4V can look at a picture AND read text about it. CLIP connects images and text so you can search photos by describing them in words. It's like giving AI multiple senses instead of just one. The future is AI that watches a cooking video, reads the recipe, and understands both together.",
  "federated-learning":
    "Federated learning trains AI without collecting everyone's data in one place. Instead of sending your hospital records to Google, the AI model comes TO your data, learns from it locally, and only sends back what it learned (not your actual data). It's like a teacher visiting 10 schools to learn teaching techniques — they bring back knowledge, not the students. This solves the biggest AI problem: privacy. Your phone's keyboard learns from your typing this way — Apple/Google never see what you type, but the model still improves.",
  "ai-safety-ethics":
    "AI safety is about making sure AI does what we ACTUALLY want, not just what we literally said. Like a genie that grants wishes too literally — 'make no one hungry' by removing everyone's stomach! Real risks include: AI bias (facial recognition working poorly for certain ethnicities because training data was unbalanced), deepfakes (fake but convincing videos), job displacement, and the long-term challenge of building AI smarter than us that still follows human values. It's the 'with great power comes great responsibility' of AI.",

  // Phase 10: Projects & Portfolio
  "beginner-projects":
    "Beginner projects are your first real AI creations — like learning to cook by following simple recipes. You might build a spam email detector, predict house prices, classify flowers by their measurements, or analyze movie reviews as positive or negative. These aren't groundbreaking, but they teach you the entire workflow: get data → clean it → build model → evaluate → improve. It's like training wheels on a bicycle — they're not impressive, but you need them before you can do tricks!",
  "intermediate-projects":
    "Intermediate projects tackle real problems with real complexity. You might build a movie recommendation system, detect faces in photos, classify diseases from medical images, or predict stock price trends. These projects require combining multiple skills — data preprocessing, feature engineering, model selection, and proper evaluation. It's like cooking a multi-course meal instead of just toast. These projects are impressive enough to show employers that you can handle real-world messiness.",
  "advanced-projects":
    "Advanced projects push close to production-quality AI systems. You might build a real-time object detection app, create a chatbot powered by LLMs, develop a music generation system, or build an autonomous trading bot. These require deep technical skills, handling edge cases, and thinking about deployment and scaling. It's like going from home cooking to running a restaurant — you need consistency, speed, and the ability to handle the unexpected. These projects genuinely impress in job interviews.",
  "kaggle-competitions":
    "Kaggle is like the Olympics of data science. Companies post real problems with real data, and thousands of data scientists worldwide compete to build the best model. You start by entering beginner-friendly competitions (like Titanic survival prediction), learn from top solutions that are publicly shared, and gradually tackle harder challenges. The ranking system shows your skill level, and 'Kaggle Grandmaster' is a globally recognized credential. It's the best way to learn from the worldwide community and benchmark your skills.",
  "career-portfolio":
    "Your portfolio is your AI resume that SHOWS rather than TELLS. Instead of just listing skills, you have GitHub repos with working code, a personal blog explaining your projects, Kaggle competition results, and maybe a deployed demo app. It's like an artist's portfolio — nobody cares if you say 'I can paint,' they want to see your paintings! A strong portfolio includes 3-5 diverse projects (different domains, techniques), clean documented code, and clear explanations of your thinking process. This is what actually gets you hired.",
};

// Process each phase file
for (let i = 1; i <= 10; i++) {
  const filePath = path.join(
    __dirname,
    "src",
    "data",
    "phases",
    `phase${i}.json`,
  );
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  let modified = false;
  data.forEach((topic) => {
    if (eli5Map[topic.id] && !topic.eli5) {
      topic.eli5 = eli5Map[topic.id];
      modified = true;
    }
  });

  if (modified) {
    // Reorder keys so eli5 comes after whyItMatters
    const reordered = data.map((topic) => {
      const newTopic = {};
      for (const [key, value] of Object.entries(topic)) {
        newTopic[key] = value;
        if (key === "whyItMatters" && topic.eli5) {
          newTopic.eli5 = topic.eli5;
        }
      }
      // Remove duplicate eli5 that was at original position
      return newTopic;
    });

    fs.writeFileSync(
      filePath,
      JSON.stringify(reordered, null, 2) + "\n",
      "utf8",
    );
    console.log(
      `✅ phase${i}.json: Added ELI5 to ${data.filter((t) => eli5Map[t.id]).length} topics`,
    );
  } else {
    console.log(`⏩ phase${i}.json: No changes needed`);
  }
}

console.log("\nDone! All ELI5 fields added.");
