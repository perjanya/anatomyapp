/**
 * Flashcard Data
 * Manually curated entries only
 * 
 * Auto-generation disabled - waiting for manually formatted flashcards
 * Approximately 50% of auto-generated cards were incorrect - removed all 164
 * 
 * Standard slug rules:
 * 1. Start from the topic HTML filename without ".html"
 * 2. Convert to lowercase
 * 3. Replace "&" with "and"
 * 4. Remove apostrophes
 * 5. Replace every run of spaces/punctuation with a single hyphen
 * 6. Remove leading/trailing hyphens
 *
 * Examples:
 * - "Inguinal canal.html" -> "inguinal-canal"
 * - "Surgical anatomy of stomach.html" -> "surgical-anatomy-of-stomach"
 * - "Gall bladder and cystic duct.html" -> "gall-bladder-and-cystic-duct"
 *
 * Single-file location:
 * - Keep all topic flashcards in this file: www/data/flashcards-data.js
 *
 * Format for user-provided data:
 * flashcardsData['topic-slug'] = [
 *   { q: 'Question?', a: 'Answer', svg: null|'artery'|'nerve'|'bone'|'muscle'|'heart' },
 *   ...
 * ];
 */

var flashcardsData = {
  // Empty - all auto-generated cards removed
  // Ready for manually provided flashcards
  
  "inguinal-canal": [
    {
      "q": "Define the inguinal canal and mention its length.",
      "a": "The inguinal canal is an oblique passage extending from the deep inguinal ring to the superficial inguinal ring, transmitting the spermatic cord in males and the round ligament in females.<br><strong>Length:</strong> approximately 4 cm in adults.",
      "svg": null
    },
    {
      "q": "List the contents of the inguinal canal.",
      "a": "<ul><li><strong>Spermatic cord</strong> (males)</li><li><strong>Round ligament of uterus</strong> (females)</li><li><strong>Ilioinguinal nerve</strong> (both sexes)</li></ul><strong>Note:</strong> Ilioinguinal nerve does not pass through the deep inguinal ring.",
      "svg": null
    },
    {
      "q": "Enumerate the boundaries of the inguinal canal (anterior and posterior walls).",
      "a": "<strong>Anterior wall:</strong><ul><li>Skin and superficial fascia</li><li>Aponeurosis of external oblique</li><li>Lateral one-third reinforced by internal oblique</li></ul><strong>Posterior wall:</strong><ul><li>Transversalis fascia</li><li>Conjoint tendon (falx inguinalis)</li><li>Reflected part of inguinal ligament</li></ul>",
      "svg": null
    },
    {
      "q": "What is the anatomical significance of the deep inguinal ring?",
      "a": "The deep inguinal ring is a <strong>V-shaped defect in the transversalis fascia</strong>, located <strong>lateral to the inferior epigastric artery</strong>, and forms the entrance of the inguinal canal.",
      "svg": null
    },
    {
      "q": "Define Hesselbach's triangle and state its clinical importance.",
      "a": "<strong>Boundaries:</strong><ul><li><strong>Medial:</strong> lateral border of rectus abdominis</li><li><strong>Lateral:</strong> inferior epigastric artery</li><li><strong>Inferior:</strong> inguinal ligament</li></ul><strong>Floor:</strong> Transversalis fascia<br><strong>Clinical importance:</strong> Common site for direct inguinal hernia.",
      "svg": null
    },
    {
      "q": "List the mechanisms that maintain the integrity of the inguinal canal.",
      "a": "<ul><li><strong>Obliquity of the canal</strong> (flap-valve mechanism)</li><li><strong>Guarding of inguinal rings</strong></li><li><strong>Shutter mechanism</strong> by internal oblique and transversus abdominis</li><li><strong>Ball-valve mechanism</strong> by cremaster muscle</li></ul>",
      "svg": null
    }
  ],

  "mesentery": [
    {
      "q": "What is the mesentery?",
      "a": "The mesentery is a <strong>double layer of peritoneum</strong> that suspends the <strong>jejunum and ileum</strong> from the posterior abdominal wall.",
      "svg": null
    },
    {
      "q": "What is meant by the free margin of the mesentery?",
      "a": "The free margin is the intestinal border of the mesentery. It encloses the jejunum and ileum and supports about <strong>6 meters</strong> of small intestine.",
      "svg": null
    },
    {
      "q": "What is the posterior attachment of the mesentery?",
      "a": "The posterior attachment, or root of the mesentery, is attached to the posterior abdominal wall and is about <strong>6 inches (15 cm)</strong> long.",
      "svg": null
    },
    {
      "q": "State the extent of the root of the mesentery.",
      "a": "It extends obliquely from the <strong>duodenojejunal flexure on the left side of L2</strong> to the <strong>ileocecal junction near the right sacroiliac region</strong>.",
      "svg": null
    },
    {
      "q": "Why is the mesentery clinically important?",
      "a": "It conveys <strong>blood vessels, lymphatics, nerves, and fat</strong> to the jejunum and ileum and provides mobility while maintaining intestinal attachment.",
      "svg": null
    }
  ],

"pudendal-nerve": [
  {
    "q": "What is the origin and root value of the pudendal nerve?",
    "a": "The pudendal nerve arises from the <strong>sacral plexus</strong> with root values <strong>S2, S3, and S4</strong>.",
    "svg": null
  },
  {
    "q": "What is the course of the pudendal nerve?",
    "a": "It has three parts: <strong>intrapelvic</strong> (to greater sciatic foramen), <strong>gluteal</strong> (around ischial spine and sacrotuberous ligament), and <strong>perineal</strong> (in pudendal canal).",
    "svg": null
  },
  {
    "q": "What structures accompany the pudendal nerve near the ischial spine?",
    "a": "Three structures (PIN): <strong>Pudendal nerve, Internal pudendal vessels, and Nerve to obturator internus</strong>.",
    "svg": null
  },
  {
    "q": "Where does the pudendal nerve enter the perineum?",
    "a": "It enters through the <strong>pudendal canal (Alcock’s canal)</strong> in the lateral wall of the ischioanal fossa.",
    "svg": null
  },
  {
    "q": "What are the branches of the pudendal nerve?",
    "a": "Branches include <strong>inferior rectal nerve</strong>, <strong>perineal nerve</strong>, and <strong>dorsal nerve of penis/clitoris</strong>.",
    "svg": null
  },
  {
    "q": "What is the function of the inferior rectal nerve?",
    "a": "It supplies the <strong>external anal sphincter (motor)</strong> and provides <strong>sensory innervation to lower anal canal and perianal skin</strong>.",
    "svg": null
  },
  {
    "q": "What does the perineal nerve supply?",
    "a": "It gives <strong>posterior scrotal/labial nerves</strong> and muscular branches to <strong>perineal muscles including sphincter urethrae</strong>.",
    "svg": null
  },
  {
    "q": "What is the function of the dorsal nerve of penis/clitoris?",
    "a": "It provides <strong>sensory innervation to the penis or clitoris</strong>.",
    "svg": null
  },
  {
    "q": "What is a pudendal nerve block?",
    "a": "A <strong>saddle nerve block</strong> performed near the <strong>ischial spine</strong> for perineal anesthesia or chronic pelvic pain management.",
    "svg": null
  }
], 

"internal-iliac-artery": [
  {
    "q": "What is the origin and area of supply of the internal iliac artery?",
    "a": "The internal iliac artery arises from the <strong>common iliac artery at L5</strong> and supplies the <strong>pelvic organs, gluteal region, perineum, and medial thigh</strong>.",
    "svg": null
  },
  {
    "q": "What are the divisions of the internal iliac artery?",
    "a": "It divides into <strong>anterior and posterior divisions</strong> near the greater sciatic notch.",
    "svg": null
  },
  {
    "q": "What are the branches of the posterior division?",
    "a": "Branches include <strong>iliolumbar artery, superior gluteal artery, and lateral sacral arteries</strong>.",
    "svg": null
  },
  {
    "q": "What are the branches of the anterior division?",
    "a": "Visceral: <strong>umbilical, uterine, inferior vesical</strong>; Parietal: <strong>obturator, internal pudendal, inferior gluteal</strong>.",
    "svg": null
  },
  {
    "q": "What is the course and significance of the uterine artery?",
    "a": "It passes medially to the uterus and crosses the <strong>ureter (water under the bridge)</strong> near the cervix, and anastomoses with the <strong>ovarian artery</strong>.",
    "svg": null
  },
  {
    "q": "What is the clinical importance of the obturator artery?",
    "a": "An <strong>accessory obturator artery</strong> may form a dangerous anastomosis called the <strong>circle of death</strong> near the femoral ring, risking severe bleeding.",
    "svg": null
  },
  {
    "q": "Describe the course of the internal pudendal artery.",
    "a": "It exits the pelvis via the <strong>greater sciatic foramen</strong>, crosses the <strong>sacrospinous ligament</strong>, enters the <strong>lesser sciatic foramen</strong>, and runs in <strong>Alcock’s canal</strong>.",
    "svg": null
  },
  {
    "q": "What is the relationship of the superior gluteal artery?",
    "a": "It passes between the <strong>lumbosacral trunk and S1 nerve</strong> and supplies <strong>gluteus medius, minimus, and upper gluteus maximus</strong>.",
    "svg": null
  },
  {
    "q": "What is the significance of the umbilical artery in adults?",
    "a": "Its proximal part remains patent and gives the <strong>superior vesical artery</strong>, while the distal part becomes fibrous.",
    "svg": null
  },
  {
    "q": "What is the function of the inferior gluteal artery?",
    "a": "It supplies the <strong>lower part of gluteus maximus</strong> and exits through the greater sciatic foramen.",
    "svg": null
  }
],

"sacral-plexus": [
  {
    "q": "What is the root value of the sacral plexus?",
    "a": "The sacral plexus is formed from <strong>L4 to S4</strong>, including the <strong>lumbosacral trunk</strong> and anterior divisions of sacral nerves.",
    "svg": null
  },
  {
    "q": "What is the area of distribution of the sacral plexus?",
    "a": "It supplies the <strong>posterior thigh, most of the leg and foot, and part of the pelvis</strong>.",
    "svg": null
  },
  {
    "q": "What are the main components forming the sacral plexus?",
    "a": "It is formed by the <strong>lumbosacral trunk, anterior division of S1, and parts of S2 and S3</strong>.",
    "svg": null
  },
  {
    "q": "What are the important relations of the sacral plexus?",
    "a": "Posterior: <strong>piriformis muscle</strong>; Anterior: <strong>internal iliac vessels, ureter, sigmoid colon</strong>.",
    "svg": null
  },
  {
    "q": "What is the course relation of the superior and inferior gluteal arteries?",
    "a": "Superior gluteal artery passes between <strong>lumbosacral trunk and S1</strong>, while inferior gluteal artery passes between <strong>S2 and S3</strong>.",
    "svg": null
  },
  {
    "q": "What are the major nerves arising from the sacral plexus?",
    "a": "Includes <strong>superior gluteal, inferior gluteal, posterior cutaneous nerve of thigh, pudendal nerve, and sciatic nerve</strong>.",
    "svg": null
  },
  {
    "q": "What are the direct muscular branches of the sacral plexus?",
    "a": "They include <strong>nerve to piriformis, nerve to obturator internus, and nerve to quadratus femoris</strong>.",
    "svg": null
  },
  {
    "q": "What is the function of the superior gluteal nerve?",
    "a": "It supplies <strong>gluteus medius, gluteus minimus, and tensor fascia lata</strong>.",
    "svg": null
  },
  {
    "q": "What is the function of the inferior gluteal nerve?",
    "a": "It supplies the <strong>gluteus maximus</strong>.",
    "svg": null
  },
  {
    "q": "What is the clinical importance of sacral plexus injury?",
    "a": "Most commonly occurs in <strong>road traffic accidents</strong>, leading to deficits depending on the nerve involved.",
    "svg": null
  }
],

"pelvic-diaphragm": [
  {
    "q": "What is the pelvic diaphragm?",
    "a": "The pelvic diaphragm is a <strong>funnel-shaped fibromuscular floor of the true pelvis</strong> formed by <strong>levator ani and coccygeus muscles</strong>.",
    "svg": "levator ani"
  },
  {
    "q": "What are the components of the pelvic diaphragm?",
    "a": "It consists of <strong>levator ani, coccygeus muscles, and superior and inferior fascia</strong> enclosing them.",
    "svg": null
  },
  {
    "q": "What are the openings in the pelvic diaphragm?",
    "a": "Two openings: <strong>urogenital hiatus</strong> (for urethra ± vagina) and <strong>anorectal hiatus</strong> (for anorectum).",
    "svg": null
  },
  {
    "q": "What are the parts of levator ani?",
    "a": "Levator ani includes <strong>pubococcygeus, puborectalis, and iliococcygeus</strong>.",
    "svg": null
  },
  {
    "q": "What is the function of puborectalis muscle?",
    "a": "It forms a <strong>U-shaped sling around the rectum</strong> and maintains the <strong>anorectal angle</strong>, essential for continence.",
    "svg": null
  },
  {
    "q": "What are the specializations of pubococcygeus?",
    "a": "In males it forms <strong>levator prostate</strong>, and in females <strong>pubovaginalis</strong> which acts as a vaginal sphincter.",
    "svg": null
  },
  {
    "q": "What is the nerve supply of the pelvic diaphragm?",
    "a": "Supplied by <strong>S4 ventral rami</strong> (pelvic surface) and <strong>perineal and inferior rectal nerves</strong> (perineal surface).",
    "svg": null
  },
  {
    "q": "What is the role of pelvic diaphragm during labour?",
    "a": "It <strong>guides descent and rotation of the fetal head</strong> during the second stage of labour.",
    "svg": null
  },
  {
    "q": "What are the functions of the pelvic diaphragm?",
    "a": "It <strong>supports pelvic viscera, aids continence, assists defecation, micturition, and childbirth</strong>.",
    "svg": null
  },
  {
    "q": "What is levator ani syndrome?",
    "a": "A condition due to <strong>spasm of levator ani muscle</strong> causing <strong>rectal or perineal pain and tenesmus</strong>.",
    "svg": null
  },
  {
    "q": "What is the Hiatus of Schwalbe?",
    "a": "A gap between <strong>levator ani and obturator fascia</strong> through which <strong>ischiorectal hernias</strong> may occur.",
    "svg": null
  },
  {
    "q": "What are Kegel exercises and their importance?",
    "a": "Voluntary contractions of perineal muscles that <strong>strengthen pelvic floor</strong>, helping in <strong>urinary incontinence, erectile dysfunction, and premature ejaculation</strong>.",
    "svg": null
  }
],

"pelvic-anatomy": [
  {
    "q": "What is the difference between true pelvis and false pelvis?",
    "a": "The <strong>false pelvis</strong> lies above the <strong>linea terminalis</strong>, while the <strong>true pelvis</strong> lies below it and forms the pelvic cavity.",
    "svg": null
  },
  {
    "q": "What structures form the linea terminalis?",
    "a": "The linea terminalis consists of <strong>pectineal line, arcuate line, pubic crest, sacral ala, and sacral promontory</strong>.",
    "svg": null
  },
  {
    "q": "What are the boundaries of the pelvic inlet?",
    "a": "Posterior: <strong>sacral promontory</strong>; Lateral: <strong>linea terminalis</strong>; Anterior: <strong>pubic symphysis and pubic rami</strong>.",
    "svg": null
  },
  {
    "q": "What is the obstetrical conjugate?",
    "a": "It is the <strong>shortest anteroposterior diameter of the pelvic inlet</strong> through which the fetal head must pass.",
    "svg": null
  },
  {
    "q": "How is the obstetrical conjugate calculated clinically?",
    "a": "It is estimated from the <strong>diagonal conjugate</strong> by subtracting <strong>1.5–2 cm</strong>.",
    "svg": null
  },
  {
    "q": "What is the narrowest part of the pelvis?",
    "a": "The <strong>midpelvis at the level of the ischial spines</strong> is the narrowest part, measured by the <strong>interspinous diameter</strong>.",
    "svg": null
  },
  {
    "q": "What is engagement in obstetrics?",
    "a": "Engagement is the <strong>descent of the biparietal diameter of the fetal head below the pelvic inlet</strong>.",
    "svg": null
  },
  {
    "q": "What are the main pelvic joints?",
    "a": "The pelvis includes the <strong>symphysis pubis</strong> and <strong>sacroiliac joints</strong>, which are loosened during pregnancy by <strong>relaxin</strong>.",
    "svg": null
  },
  {
    "q": "What is the function of the sacrospinous ligament?",
    "a": "It extends from the <strong>ischial spine to sacrum</strong> and is used in <strong>vaginal suspension surgeries</strong>.",
    "svg": null
  },
  {
    "q": "Which structures pass through the greater sciatic foramen?",
    "a": "Structures include <strong>piriformis, sciatic nerve, superior gluteal vessels and nerve, nerve to obturator internus, and pudendal vessels</strong>.",
    "svg": null
  }
],

"portocaval-anastomoses": [
  {
    "q": "What is a portocaval anastomosis?",
    "a": "A portocaval anastomosis is a communication between the <strong>portal venous system and systemic (somatic) veins</strong>.",
    "svg": null
  },
  {
    "q": "What is the physiological significance of portocaval anastomoses?",
    "a": "They provide <strong>alternative pathways for venous return from the gastrointestinal tract</strong> in conditions like <strong>portal vein obstruction or cirrhosis</strong>.",
    "svg": null
  },
  {
    "q": "What is portal hypertension?",
    "a": "Portal hypertension is defined as an increase in portal venous pressure above <strong>6 mmHg</strong>.",
    "svg": null
  },
  {
    "q": "What are the normal portal venous pressure values?",
    "a": "Normal portal venous pressure ranges from <strong>1–4 mmHg</strong>, and is typically <strong>below 6 mmHg</strong>.",
    "svg": null
  },
  {
    "q": "What are the common causes of portal hypertension?",
    "a": "Common causes include <strong>liver cirrhosis (intrahepatic)</strong> and <strong>portal vein obstruction or structural changes (extrahepatic)</strong>.",
    "svg": null
  },
  {
    "q": "What is wedged hepatic venous pressure (WHVP)?",
    "a": "WHVP is measured by <strong>wedging a catheter in a hepatic vein, occluding it, and recording the pressure of proximal static blood</strong>.",
    "svg": null
  },
  {
    "q": "What is hepatic venous pressure gradient (HVPG)?",
    "a": "HVPG is the <strong>difference between wedged hepatic venous pressure and free hepatic venous pressure</strong>, estimating the gradient between the <strong>portal vein and inferior vena cava</strong>.",
    "svg": null
  },
  {
    "q": "What HVPG value defines portal hypertension?",
    "a": "An HVPG of <strong>≥5 mmHg</strong> defines portal hypertension.",
    "svg": null
  },
  {
    "q": "When is portal hypertension considered clinically significant?",
    "a": "Portal hypertension is considered clinically significant when HVPG exceeds <strong>10 mmHg</strong>.",
    "svg": null
  },
  {
    "q": "At what pressure does variceal hemorrhage typically occur?",
    "a": "Variceal hemorrhage is likely when portal pressure exceeds <strong>12 mmHg</strong>.",
    "svg": null
  }
],

  "celiac-trunk": [
    {
      "q": "What is the celiac trunk?",
      "a": "The celiac trunk is the <strong>artery of the foregut</strong> and is the first major anterior branch of the abdominal aorta.",
      "svg": "artery"
    },
    {
      "q": "At what vertebral level is the celiac trunk usually found?",
      "a": "It usually arises at the level of the <strong>lower third of the first lumbar vertebra (L1)</strong>.",
      "svg": null
    },
    {
      "q": "What is the relation of the celiac trunk to the median arcuate ligament?",
      "a": "The median arcuate ligament passes in front of the aorta near the origin of the celiac trunk and may lie just above it.",
      "svg": null
    },
    {
      "q": "What is the relation of the celiac trunk to the celiac ganglia?",
      "a": "The right and left <strong>celiac ganglia</strong> lie on either side of the base of the celiac trunk and may partly conceal its origin.",
      "svg": null
    },
    {
      "q": "Name the three classic branches of the celiac trunk.",
      "a": "<ul><li><strong>Left gastric artery</strong></li><li><strong>Common hepatic artery</strong></li><li><strong>Splenic artery</strong></li></ul>",
      "svg": "artery"
    }
  ],

"ischioanal-fossa": [
  {
    "q": "Where is the ischioanal fossa located and what is its shape?",
    "a": "The ischioanal fossa lies <strong>lateral to the anal canal</strong> and is <strong>pyramidal (wedge-shaped)</strong> with apex above and base below.",
    "svg": "ischioanal canal"
  },
  {
    "q": "What are the boundaries of the ischioanal fossa?",
    "a": "Anterior: <strong>urogenital diaphragm</strong>; Posterior: <strong>gluteus maximus and sacrotuberous ligament</strong>; Medial: <strong>levator ani and external anal sphincter</strong>; Lateral: <strong>obturator internus and fascia</strong>; Inferior: <strong>perineal skin</strong>.",
    "svg": null
  },
  {
    "q": "What are the contents of the ischioanal fossa?",
    "a": "It contains <strong>ischiorectal fat pad, inferior rectal vessels and nerve, perineal branch of S4, and branches of posterior cutaneous nerve of thigh</strong>.",
    "svg": null
  },
  {
    "q": "What is the pudendal canal (Alcock’s canal)?",
    "a": "A fascial canal in the lateral wall of the ischioanal fossa containing the <strong>pudendal nerve and internal pudendal vessels</strong>.",
    "svg": null
  },
  {
    "q": "What is the clinical significance of ischioanal abscess?",
    "a": "Infection of the ischioanal fossa leads to a <strong>horseshoe-shaped abscess</strong> due to spread across the midline.",
    "svg": null
  },
  {
    "q": "What is Goodsall’s rule?",
    "a": "Anterior external openings lead to <strong>straight fistulous tracts</strong>, while posterior openings follow a <strong>curved tract to the posterior midline</strong>.",
    "svg": null
  },
  {
    "q": "What is the Hiatus of Schwalbe?",
    "a": "A gap between <strong>levator ani and obturator fascia</strong> through which pelvic organs may herniate, causing <strong>ischiorectal hernia</strong>.",
    "svg": null
  },
  {
    "q": "What is the function of the ischioanal fat pad?",
    "a": "It allows <strong>expansion of the anal canal during defecation</strong> and acts as a <strong>cushion</strong>.",
    "svg": null
  }
],

"anorectum": [
  {
    "q": "Where is the anorectal junction located anatomically?",
    "a": "The anorectal junction lies at the level of the <strong>S3 vertebra</strong> and opposite the <strong>left sacroiliac joint</strong>.",
    "svg": "anorectum"
  },
  {
    "q": "What is the difference between anatomical and surgical anal canal?",
    "a": "The anatomical anal canal lies <strong>distal to the pectinate line</strong>, whereas the surgical anal canal includes the <strong>anatomical canal plus 2 cm of distal rectum above it</strong>.",
    "svg": null
  },
  {
    "q": "What are the curvatures of the rectum?",
    "a": "The rectum has <strong>sacral curvature (concave anteriorly)</strong> and <strong>perineal curvature (convex anteriorly due to puborectalis)</strong>, along with lateral curvatures.",
    "svg": null
  },
  {
    "q": "How is the rectum related to peritoneum?",
    "a": "Upper third is <strong>covered on three sides</strong>, middle third <strong>anteriorly covered</strong>, and lower third has <strong>no peritoneal covering</strong>.",
    "svg": null
  },
  {
    "q": "What are the key internal features of the anal canal?",
    "a": "The anal canal contains <strong>anal columns of Morgagni, anal valves, anal sinuses (crypts), anal ducts, and anal papillae</strong>.",
    "svg": "analinterior"
  },
  {
    "q": "What is the pectinate (dentate) line?",
    "a": "It is the line formed by the <strong>anal valves</strong>, marking the junction between <strong>endodermal and ectodermal regions</strong>.",
    "svg": null
  },
  {
    "q": "What are the differences above and below the pectinate line?",
    "a": "Above: <strong>columnar epithelium, autonomic innervation, portal venous drainage</strong>. Below: <strong>stratified squamous epithelium, somatic innervation, systemic venous drainage</strong>.",
    "svg": null
  },
  {
    "q": "What is Hilton’s line?",
    "a": "Hilton’s line is the <strong>mucocutaneous junction</strong> between stratified squamous and columnar epithelium.",
    "svg": null
  },
  {
    "q": "Why is the pectinate line clinically important?",
    "a": "It determines differences in <strong>blood supply, nerve supply, lymphatic drainage, and type of carcinoma</strong> (adenocarcinoma above, squamous cell carcinoma below).",
    "svg": null
  },
  {
    "q": "What is the clinical difference between internal and external hemorrhoids?",
    "a": "Internal hemorrhoids occur <strong>above the pectinate line</strong> (visceral, less painful), while external hemorrhoids occur <strong>below it</strong> (somatic, painful).",
    "svg": null
  }
],

"urinary-bladder": [
  {
    "q": "Where is the urinary bladder located?",
    "a": "The urinary bladder lies in the <strong>anterior part of the lesser pelvis</strong>, behind the <strong>pubic symphysis</strong>, in front of the <strong>rectum in males</strong> and <strong>uterus in females</strong>.",
    "svg": "urinary bladder"
  },
  {
    "q": "How does bladder position change with distension?",
    "a": "An empty bladder is <strong>completely pelvic</strong>, but when distended it expands into the <strong>infraumbilical abdominal region</strong>.",
    "svg": null
  },
  {
    "q": "What are the main external features of the urinary bladder?",
    "a": "The bladder has <strong>one superior surface, two inferolateral surfaces, and one posterior (base) surface</strong>, along with <strong>apex, neck, and lateral angles</strong>.",
    "svg": null
  },
  {
    "q": "What are the boundaries of the trigone of the bladder?",
    "a": "The trigone is bounded by the <strong>interureteric ridge superiorly</strong> and <strong>ureterourethral ridges on either side</strong>.",
    "svg": "interior of bladder trigone of bladder"
  },
  {
    "q": "What is unique about the trigone mucosa?",
    "a": "The trigone has <strong>smooth mucosa firmly adherent to the muscular layer</strong> and lacks a <strong>submucosa</strong>.",
    "svg": null
  },
  {
    "q": "What is the embryological origin of the trigone of the bladder?",
    "a": "The trigone develops from the <strong>mesonephric ducts (mesoderm)</strong>, whereas the rest of the bladder is derived from the <strong>urogenital sinus (endoderm)</strong>.",
    "svg": null
  },
  {
    "q": "What is the arterial supply of the urinary bladder?",
    "a": "The bladder is supplied mainly by the <strong>superior and inferior vesical arteries</strong>, with contributions from <strong>obturator, inferior gluteal, uterine, and vaginal arteries</strong>.",
    "svg": null
  },
  {
    "q": "What is the parasympathetic and sympathetic innervation of the bladder?",
    "a": "Parasympathetic supply arises from <strong>S2–S4 (pelvic splanchnic nerves)</strong> and stimulates detrusor contraction, while sympathetic supply from <strong>T11–L2</strong> promotes storage.",
    "svg": null
  },
  {
    "q": "How is vesicoureteral reflux prevented?",
    "a": "Reflux is prevented by the <strong>oblique intramural course of the ureters</strong> and their blending with the <strong>detrusor muscle</strong>, forming a valve-like mechanism.",
    "svg": null
  },
  {
    "q": "What happens in vesicoureteral reflux?",
    "a": "Reflux of urine into ureters can lead to <strong>hydroureter, hydronephrosis, and megaloureter</strong>.",
    "svg": null
  }
],

"suprarenal-glands-gross-anatomy": [
  {
    "q": "What are the synonyms and location of suprarenal glands?",
    "a": "Suprarenal glands are also called <strong>adrenal glands</strong> and are located <strong>anterosuperior to the upper pole of the kidneys in the epigastrium</strong>.",
    "svg": "suprarenal glands"
  },
  {
    "q": "What are the shapes of right and left suprarenal glands?",
    "a": "The <strong>right suprarenal gland is wedge-shaped</strong>, while the <strong>left suprarenal gland is semilunar</strong>.",
    "svg": null
  },
  {
    "q": "What are the functions of adrenal cortex layers?",
    "a": "The cortex has three layers: <strong>zona glomerulosa (mineralocorticoids - aldosterone)</strong>, <strong>zona fasciculata (cortisol)</strong>, and <strong>zona reticularis (sex steroids)</strong>.",
    "svg": null
  },
  {
    "q": "What is the function of the adrenal medulla?",
    "a": "The adrenal medulla acts like a <strong>sympathetic ganglion</strong> and secretes <strong>adrenaline and noradrenaline</strong>.",
    "svg": null
  },
  {
    "q": "Describe the arterial supply of suprarenal glands.",
    "a": "They receive blood from three sources: <strong>superior suprarenal artery (inferior phrenic artery)</strong>, <strong>middle suprarenal artery (aorta)</strong>, and <strong>inferior suprarenal artery (renal artery)</strong>.",
    "svg": null
  },
  {
    "q": "How does venous drainage differ between right and left suprarenal glands?",
    "a": "The <strong>right suprarenal vein drains directly into the inferior vena cava</strong>, while the <strong>left suprarenal vein drains into the left renal vein</strong>.",
    "svg": null
  },
  {
    "q": "Why is the right suprarenal vein clinically important?",
    "a": "It is <strong>short and drains directly into the inferior vena cava</strong>, making it <strong>difficult to ligate during surgery</strong>.",
    "svg": null
  },
  {
    "q": "What is the covering of the suprarenal gland?",
    "a": "It is covered by <strong>perirenal fat (loose areolar tissue)</strong> and enclosed within the <strong>renal fascia</strong>, separated from the kidney by a septum.",
    "svg": null
  },
  {
    "q": "Why is the adrenal vein ligated first in pheochromocytoma surgery?",
    "a": "To prevent <strong>systemic release of catecholamines</strong> from the tumor into circulation.",
    "svg": null
  },
  {
    "q": "What are common complications during adrenalectomy?",
    "a": "Left side: <strong>injury to spleen, pancreas, inferior mesenteric vein</strong>. Right side: <strong>injury to liver, duodenum, inferior vena cava</strong>.",
    "svg": null
  }
],

"coverings-of-kidney": [
  {
    "q": "What are the three main coverings of the kidney?",
    "a": "The kidney is surrounded by three layers: <strong>fibrous capsule, perinephric (perirenal) fat, and renal fascia</strong>.",
    "svg": "coverings of kidney"
  },
  {
    "q": "What is the fibrous capsule of the kidney?",
    "a": "The fibrous capsule is a <strong>thin condensation of fibrous tissue</strong> that closely invests the kidney and is also called the <strong>true capsule</strong>.",
    "svg": null
  },
  {
    "q": "What is perinephric (perirenal) fat?",
    "a": "Perinephric fat is an <strong>accumulation of extraperitoneal fat</strong> that lies <strong>immediately outside the fibrous capsule</strong> and completely surrounds the kidney.",
    "svg": null
  },
  {
    "q": "What is the renal fascia and what are its layers?",
    "a": "Renal fascia (Gerota’s fascia) is a <strong>membranous condensation of extraperitoneal fascia</strong> with an <strong>anterior layer (fascia of Toldt)</strong> and a <strong>posterior layer (fascia of Zuckerkandl)</strong>.",
    "svg": null
  },
  {
    "q": "Which additional structure is enclosed within the renal fascia?",
    "a": "The <strong>suprarenal (adrenal) gland</strong> is also enclosed within the renal fascial compartment.",
    "svg": null
  },
  {
    "q": "What is the surgical importance of the renal fascia?",
    "a": "The <strong>renal fascia must be incised during surgical approaches to the kidney</strong>.",
    "svg": null
  },
  {
    "q": "What is the role of pararenal fat?",
    "a": "Pararenal fat fills the <strong>paravertebral gutter</strong> and acts as a <strong>posterior cushion for the kidneys</strong>.",
    "svg": null
  }
],

  "surgical-anatomy-of-stomach": [
    {
      "q": "Name the two curvatures of the stomach.",
      "a": "The stomach has a <strong>lesser curvature</strong> on the right side and a <strong>greater curvature</strong> on the left side.",
      "svg": null
    },
    {
      "q": "What forms the stomach bed?",
      "a": "The stomach bed is formed by structures lying posterior to the stomach, including the <strong>diaphragm, spleen, left kidney, left suprarenal gland, pancreas, transverse mesocolon, and colon</strong>.",
      "svg": null
    },
    {
      "q": "What is the arterial supply of the stomach?",
      "a": "The stomach is supplied by branches of the celiac trunk, chiefly the <strong>left and right gastric</strong>, <strong>left and right gastro-omental</strong>, and <strong>short gastric arteries</strong>.",
      "svg": "artery"
    },
    {
      "q": "What is the lymphatic drainage relevance of the stomach in surgery?",
      "a": "Lymph from the stomach follows the arteries to nodes along the <strong>lesser curvature, greater curvature, splenic artery, and celiac nodes</strong>, which is important in gastric carcinoma spread.",
      "svg": null
    },
    {
      "q": "Why is the posterior relation of the stomach important surgically?",
      "a": "Because ulcers or posterior gastric perforations may involve the <strong>lesser sac, pancreas, or nearby vessels</strong> in the stomach bed.",
      "svg": null
    }
  ],

"gross-anatomy-of-pancreas": [
  {
    "q": "What are the endocrine and exocrine functions of the pancreas?",
    "a": "The pancreas has both endocrine and exocrine functions. The endocrine part secretes <strong>insulin, glucagon, somatostatin, and pancreatic polypeptide</strong>, while the exocrine part produces <strong>bicarbonate-rich digestive juice and enzymes such as proteases, amylase, lipase, and phospholipase</strong>.",
    "svg": null
  },
  {
    "q": "Name the parts of the pancreas.",
    "a": "The pancreas is divided into <strong>head, neck, body, tail, and uncinate process</strong>.",
    "svg": "partspancreas.html"
  },
  {
    "q": "What is the anatomical relation of the head and uncinate process of the pancreas?",
    "a": "The head of the pancreas lies within the <strong>C-shaped concavity of the duodenum</strong>, and the uncinate process is a hook-like projection that lies <strong>posterior to the superior mesenteric vessels</strong>.",
    "svg": null
  },
  {
    "q": "What important vascular structure lies posterior to the neck of the pancreas?",
    "a": "The <strong>portal vein is formed posterior to the neck of the pancreas</strong> by the union of the superior mesenteric vein and splenic vein.",
    "svg": null
  },
  {
    "q": "What is the course and significance of the splenic artery in relation to the pancreas?",
    "a": "The splenic artery runs along the <strong>upper border of the pancreas</strong> and supplies the <strong>body, neck, and tail</strong>. It is often tortuous, possibly to accommodate movements of the spleen and stomach.",
    "svg": null
  },
  {
    "q": "What are the relations of the anterior and posterior surfaces of the pancreas?",
    "a": "The anterior surface is related to the <strong>lesser sac and stomach</strong>, while the posterior surface is non-peritoneal and related to the <strong>aorta, superior mesenteric artery, splenic vein, left kidney, left suprarenal gland, and renal vessels</strong>.",
    "svg": null
  },
  {
    "q": "Describe the duct system of the pancreas.",
    "a": "The <strong>main pancreatic duct (duct of Wirsung)</strong> joins the common bile duct and opens into the duodenum at the major papilla. The <strong>accessory duct (duct of Santorini)</strong> may open separately into the duodenum or drain into the main duct.",
    "svg": "duct system of pancreas.svg"
  },
  {
    "q": "What is the embryological origin of the pancreas?",
    "a": "The pancreas develops from two buds: the <strong>dorsal pancreatic bud</strong> (forming head, neck, body, and tail) and the <strong>ventral pancreatic bud</strong> (forming the posterior head and uncinate process).",
    "svg": null
  },
  {
    "q": "What is the lymphatic drainage of the pancreas?",
    "a": "Lymph from the pancreas drains into <strong>pancreaticosplenic, celiac, superior mesenteric, and pyloric lymph nodes</strong>.",
    "svg": null
  },
  {
    "q": "Why is carcinoma of the head of pancreas clinically important?",
    "a": "Carcinoma of the head of pancreas may compress the <strong>common bile duct</strong>, leading to <strong>obstructive jaundice</strong>.",
    "svg": null
  }
], 

  "salient-features-of-structures-forming-inguinal-canal": [
    {
      "q": "What is the inguinal ligament?",
      "a": "The inguinal ligament is the <strong>thickened rolled inferior border of the external oblique aponeurosis</strong>, extending from the <strong>ASIS to the pubic tubercle</strong> and forming the floor of the inguinal canal.",
      "svg": null
    },
    {
      "q": "What is the lacunar ligament?",
      "a": "The lacunar ligament, or <strong>Gimbernat ligament</strong>, is the reflected pectineal expansion from the medial end of the inguinal ligament.",
      "svg": null
    },
    {
      "q": "What is the pectineal ligament?",
      "a": "The pectineal ligament of <strong>Astley Cooper</strong> extends laterally along the pecten pubis and is an important surgical landmark in groin repairs.",
      "svg": null
    },
    {
      "q": "What is the superficial inguinal ring?",
      "a": "It is a <strong>triangular opening</strong> in the aponeurosis of the external oblique, situated above the pubic crest.",
      "svg": null
    },
    {
      "q": "What is the deep inguinal ring?",
      "a": "The deep inguinal ring is a <strong>V-shaped defect in the transversalis fascia</strong> situated <strong>lateral to the inferior epigastric artery</strong>.",
      "svg": null
    },
    {
      "q": "What is the falx inguinalis?",
      "a": "The falx inguinalis, or <strong>conjoint tendon</strong>, is formed by the fused lower fibers of the <strong>internal oblique and transversus abdominis</strong> and reinforces the posterior wall of the inguinal canal medially.",
      "svg": null
    }
  ],

  "cleavage": [
    {
      "q": "What is Definition?",
      "a": "Cleavage is a series of rapid, successive mitoses of zygote producing smaller blastomeres",
      "svg": null
    },
    {
      "q": "What is Differentiation?",
      "a": "Oct4/Nanog maintain totipotency",
      "svg": null
    },
    {
      "q": "What is Blastocyst?",
      "a": "Oct4/Nanog maintain totipotency",
      "svg": null
    },
    {
      "q": "What is Regulation?",
      "a": "Oct4/Nanog maintain totipotency",
      "svg": null
    },
    {
      "q": "What is Clinical relevance?",
      "a": "Sanskrit (Devanagari):",
      "svg": null
    },
    {
      "q": "What is Garbha Upanishad – relevant sloka?",
      "a": "Sanskrit (Devanagari):",
      "svg": null
    }
  ],
  "fetal-membranes": [
    {
      "q": "What is Chorion?",
      "a": "Consists of developing trophoblast and extraembryonic mesothelium",
      "svg": null
    },
    {
      "q": "What is Amnion (chorio-amnion)?",
      "a": "Consists of amniogenic cells derived from edges of epiblast of embryonic disc. These cells outline the amniotic cavity. This cavity expands until it touches chorion – to form chorio-amnion. The amn...",
      "svg": null
    }
  ],
  "gastrulation": [
    {
      "q": "What is Definition?",
      "a": "Gastrulation is a series of events that result in the formation of the 3 germ layers namely ectoderm, endoderm and mesoderm.",
      "svg": null
    },
    {
      "q": "What is Mechanism?",
      "a": "Collective movement of cells through the primitive streak and to interior of the embryo to form the three primary germ layers constitutes gastrulation",
      "svg": null
    },
    {
      "q": "What is Process?",
      "a": "Week 3 (days 15-21): Epiblast-derived ingress through primitive streak (caudal, day 15).",
      "svg": null
    },
    {
      "q": "What is Clinical relevance?",
      "a": "Neural Tube Defects (NTDs): Notochord induction failure (SHH disruption) → spina bifida (1:1,000); folic acid (0.4mg) reduces risk 70% by aiding methylation.",
      "svg": "nerve"
    }
  ],
  "implantation": [
    {
      "q": "What is Definition?",
      "a": "Process of sequential apposition, adhesion, and invasion of blastocyst into the uterine endometrium via trophoblast is referred as implantation.",
      "svg": null
    },
    {
      "q": "What is Site and time of implantation?",
      "a": "Common site of implantation is posterior wall of uterine fundus.",
      "svg": null
    },
    {
      "q": "What is Decidua?",
      "a": "hCG Monitoring: Syncytiotrophoblast secreted hCG rise (doubling q48h) confirms implantation; subnormal in vanishing twin or molar (cytotrophoblast overgrowth)",
      "svg": null
    },
    {
      "q": "What is Confirmation of implantation?",
      "a": "hCG Monitoring: Syncytiotrophoblast secreted hCG rise (doubling q48h) confirms implantation; subnormal in vanishing twin or molar (cytotrophoblast overgrowth)",
      "svg": null
    },
    {
      "q": "What is Window of Implantation (WOI)?",
      "a": "ERA is a molecular diagnostic test used in IVF to assess endometrial receptivity by analyzing the expression of 238-248 genes from an endometrial biopsy, identifying the personalized window of impl...",
      "svg": null
    },
    {
      "q": "What is Clinical relevance?",
      "a": "ERA is a molecular diagnostic test used in IVF to assess endometrial receptivity by analyzing the expression of 238-248 genes from an endometrial biopsy, identifying the personalized window of impl...",
      "svg": null
    },
    {
      "q": "What is Definition and Purpose?",
      "a": "ERA is a molecular diagnostic test used in IVF to assess endometrial receptivity by analyzing the expression of 238-248 genes from an endometrial biopsy, identifying the personalized window of impl...",
      "svg": null
    },
    {
      "q": "What is Procedure?",
      "a": "Performed via a simple office biopsy (similar to a Pap smear) on cycle day ~21 (or adjusted), with RNA extracted and profiled; results take 4-6 weeks, guiding a subsequent frozen embryo transfer cy...",
      "svg": null
    }
  ],
  "meiosis": [
    {
      "q": "What is Stages of Meiosis?",
      "a": "Divided into Meiosis I (reductional) and Meiosis II (equational, similar to mitosis).",
      "svg": null
    },
    {
      "q": "What is Prophase I?",
      "a": "Prophase I is the longest phase of meiosis (~90% of total time), crucial for genetic recombination. It consists of five sequential sub-stages, enabling synapsis and crossing over between homologous...",
      "svg": null
    },
    {
      "q": "What is Key Features?",
      "a": "It is non-separation of chromosomes during meiosis.",
      "svg": null
    },
    {
      "q": "What is Non - disjunction?",
      "a": "It is non-separation of chromosomes during meiosis.",
      "svg": null
    }
  ],
  "mitosis": [
    {
      "q": "What is Stages of Mitosis?",
      "a": "Mitosis occurs in four sequential stages, followed by cytokinesis:",
      "svg": null
    }
  ],
  "neural-crest-cells-and-derivatives": [
    {
      "q": "What is Neural crest derivatives?",
      "a": "Are neural crest diseases",
      "svg": "nerve"
    },
    {
      "q": "What is Neurocristopathies?",
      "a": "Are neural crest diseases",
      "svg": "nerve"
    }
  ],
  "neural-tube": [
    {
      "q": "What is Neural plate?",
      "a": "It is a pear-shaped thickening of ectoderm.",
      "svg": "nerve"
    },
    {
      "q": "What is Neural folds?",
      "a": "These appear due to folding of neural tube along longitudinal axis.",
      "svg": "nerve"
    },
    {
      "q": "What is Neural groove?",
      "a": "Longitudinal depression enclosed by the neural folds.",
      "svg": "nerve"
    }
  ],
  "notochord": [
    {
      "q": "What is Notochordal Process?",
      "a": "From primitive node, epiblast cells ingress and forms hollow notochordal process (head process rostrally)",
      "svg": null
    },
    {
      "q": "What is Neurenteric plate and canal?",
      "a": "Ventral floor merges of notochord merges with endoderm and forms notochordal plate (transient hollow phase).",
      "svg": null
    },
    {
      "q": "What is Clinical relevance?",
      "a": "Neural Tube Defects (NTDs): Notochord SHH induction failure lead to anencephaly or spina bifida",
      "svg": "nerve"
    }
  ],
  "oogenesis": [
    {
      "q": "What is Primordial germ cells (PGCs)?",
      "a": "PGCs appear in yolk sac endoderm (week 3-4 IUL)",
      "svg": null
    },
    {
      "q": "What is Oogonia?",
      "a": "Oogonia (from PGC mitoses) peak at ~7 million (week 20)",
      "svg": null
    },
    {
      "q": "What is Primary oocyte?",
      "a": "Primary oocytes enter diplotene arrest mid-gestation; resume briefly pre-ovulation",
      "svg": null
    },
    {
      "q": "What is Follicular Development Stages?",
      "a": "Primary oocyte + single layer flattened pre-granulosa",
      "svg": null
    },
    {
      "q": "What is Number of primordial follicles?",
      "a": "Fetal AMH (Sertoli/granulosa homolog) → Müllerian regression in males.",
      "svg": null
    },
    {
      "q": "What is Regulation?",
      "a": "Fetal AMH (Sertoli/granulosa homolog) → Müllerian regression in males.",
      "svg": null
    },
    {
      "q": "What is Clinical relevance?",
      "a": "Premature Ovarian Insufficiency (POI): Accelerated atresia/depletion of primordial pool (e.g., genetic FMR1 mutations) causes early menopause",
      "svg": null
    },
    {
      "q": "What is Primordial follicle?",
      "a": "Primary oocyte + single layer flattened pre-granulosa",
      "svg": null
    }
  ],
  "oropharyngeal-membrane-and-cloacal-membrane": [
    {
      "q": "What is Oropharyngeal membrane?",
      "a": "Oropharyngeal membrane is located at the cranial end of the developing trilaminar disc.",
      "svg": null
    },
    {
      "q": "What is Cloacal membrane?",
      "a": "Cloacal membrane is located at the caudal end of the developing embryo.",
      "svg": null
    }
  ],
  "ovulation": [
    {
      "q": "What is Ovulation Monitoring?",
      "a": "Anovulation Diagnosis in PCOS: Absent LH surge or follicle rupture as detected by transvaginal ultrasonography",
      "svg": null
    },
    {
      "q": "What is Clinical relevance?",
      "a": "Anovulation Diagnosis in PCOS: Absent LH surge or follicle rupture as detected by transvaginal ultrasonography",
      "svg": null
    }
  ],
  "placenta": [
    {
      "q": "What is The components of placenta?",
      "a": "Chorionic plate is made up of:",
      "svg": null
    },
    {
      "q": "What is Variations of placenta?",
      "a": "Implantation of blastocyst into lower uterine segment is called placenta previa.",
      "svg": null
    },
    {
      "q": "What is Other anomalies of placenta?",
      "a": "Instead of shaped like a disc, the placenta may be",
      "svg": null
    },
    {
      "q": "What is Basal plate?",
      "a": "Chorionic plate is made up of:",
      "svg": null
    },
    {
      "q": "What is Chorionic plate?",
      "a": "Chorionic plate is made up of:",
      "svg": null
    },
    {
      "q": "What is The villi?",
      "a": "Villi attach the chorionic plate to the basal plate.",
      "svg": null
    }
  ],
  "prechordal-plate": [
    {
      "q": "What is Transgenerational Epigenetic Stability?",
      "a": "Folate levels in parents (specifically paternal folate) are critical for ensuring the fidelity of the sperm epigenome:",
      "svg": null
    }
  ],
  "primitive-streak": [
    {
      "q": "What is Clinical relevance?",
      "a": "Heterotaxy Syndromes: Asymmetry failure (nodal/FGF8 defects) → situs inversus",
      "svg": null
    }
  ],
  "spermatogenesis": [
    {
      "q": "What is Primordial germ cells (PGCs)?",
      "a": "Appear in the dorsal wall of yolk sac in the 3rd week of intrauterine life (IUL).",
      "svg": null
    },
    {
      "q": "What is Spermatogenesis is divided into three phases?",
      "a": "Spermatocytogenesis is the process of replenishment of spermatogonial cells. Spermatogonium divides mitotically to form spermatogonia A and B. Spermatogonium A, on division gives rise to spermatogo...",
      "svg": null
    },
    {
      "q": "What is Spermatocytogenesis?",
      "a": "Spermatocytogenesis is the process of replenishment of spermatogonial cells. Spermatogonium divides mitotically to form spermatogonia A and B. Spermatogonium A, on division gives rise to spermatogo...",
      "svg": null
    },
    {
      "q": "What is Meiosis?",
      "a": "Primary spermatocyte (largest, diploid 2n=46, XX or 46, XY) undergoes Meiosis I → two secondary spermatocytes (haploid n=23: one X, one Y).",
      "svg": null
    },
    {
      "q": "What is Spermiogenesis?",
      "a": "- It is the conversion / metamorphosis of spermatid into sperm/ spermatozoa.",
      "svg": null
    },
    {
      "q": "Comprises the following phases?",
      "a": "Metamorphosis of round spermatid → streamlined spermatozoon in Sertoli cells (~24 days). Phases:",
      "svg": null
    },
    {
      "q": "What is Duration of spermatogenesis?",
      "a": "~72 to 76 days in humans, with waves every ~16 days for continuous output.",
      "svg": null
    },
    {
      "q": "What is Structure of mature spermatozoa?",
      "a": "Thus, from the rounded spermatid mature sperm (spermatozoon) is formed having:",
      "svg": null
    }
  ],
  "twinning": [
    {
      "q": "What is Classified as?",
      "a": "Dizygotic (fraternal): two zygotes from separate ova/sperm)",
      "svg": null
    }
  ],
  "week-3-gastrulation-and-trilaminar-disc-formation": [
    {
      "q": "What is Key structures formed?",
      "a": "Primitive Streak: Transient groove in epiblast (caudal to rostral). Site of gastrulation ingress. Primitive node (thickened cranial end) → notochord.",
      "svg": null
    },
    {
      "q": "Trilaminar Germ Disc?",
      "a": "Ectoderm: Neural plate (dorsal, future CNS/PNS); surface ectoderm (epidermis).",
      "svg": "nerve"
    }
  ],
  "anatomical-snuffbox": [
    {
      "q": "What is Applied aspects?",
      "a": "When the hand is in ulnar deviation, the scaphoid becomes palpable within the snuffbox.",
      "svg": null
    }
  ],
  "arterial-anastomoses-around-the-scapula": [
    {
      "q": "What is Branches of subclavian artery?",
      "a": "Suprascapular artery - distributed to supraspinous and infraspinous fossa of scapula",
      "svg": "artery"
    },
    {
      "q": "What is Branches of axillary artery?",
      "a": "Subscapular artery and its circumflex scapular branch - districutesd to the medial surface of the scapula",
      "svg": "artery"
    }
  ],
  "axillary-artery-and-axillary-vein": [
    {
      "q": "What is Surface marking?",
      "a": "With arm in 90 degree abduction -",
      "svg": null
    },
    {
      "q": "What is Applied aspects?",
      "a": "Formation - union of two brachial veins and basilic vein",
      "svg": "artery"
    },
    {
      "q": "What is Axillary vein?",
      "a": "Formation - union of two brachial veins and basilic vein",
      "svg": "artery"
    },
    {
      "q": "What is Axillary vein extent?",
      "a": "Formation - union of two brachial veins and basilic vein",
      "svg": "artery"
    },
    {
      "q": "What is Second part?",
      "a": "Second part relations",
      "svg": null
    },
    {
      "q": "What is Third part?",
      "a": "Third part relations",
      "svg": null
    },
    {
      "q": "What is Axillary vein – tributaries?",
      "a": "Cephalic vein - after passing through deltopectoral groove, cephalic vein pierces clavipectoral fascia and enters axillary vein",
      "svg": "artery"
    }
  ],
  "biceps-brachi-and-coracobrachialis": [
    {
      "q": "Actions?",
      "a": "Ligament of struthers: the lower extension of coracobrachialis to medial epicondyle or medial supracondylar spur; median nerve and brachial artery passes beneath the arch formed this fibrous band",
      "svg": "artery"
    },
    {
      "q": "What is Coracobrachialis?",
      "a": "Ligament of struthers: the lower extension of coracobrachialis to medial epicondyle or medial supracondylar spur; median nerve and brachial artery passes beneath the arch formed this fibrous band",
      "svg": "artery"
    }
  ],
  "bones-of-the-hand": [
    {
      "q": "What is Peculiarities of pisiform?",
      "a": "It is a sesamoid bone in tendon of flexor carpi ulnaris",
      "svg": "bone"
    },
    {
      "q": "What is Peculiarities of Scaphoid bone and scaphoid bone fracture?",
      "a": "It is a boat shaped proximal row radial side carpal bone",
      "svg": "bone"
    },
    {
      "q": "What is Hamate bone - important features?",
      "a": "Hamate is a wedge shaped carpal bone in distal row",
      "svg": "bone"
    },
    {
      "q": "What is Mnemonic to remember carpal bones?",
      "a": "She Looks Too Pretty",
      "svg": "bone"
    },
    {
      "q": "What is Metacarpals?",
      "a": "Parts of metacarpals",
      "svg": null
    },
    {
      "q": "What is Phalanges?",
      "a": "Parts of phalanges",
      "svg": null
    }
  ],
  "boundaries-and-contents-of-axilla": [
    {
      "q": "What is Boundaries of axilla?",
      "a": "Anterior wall - Pectoralis major and minor",
      "svg": null
    }
  ],
  "brachial-artery": [
    {
      "q": "Branches?",
      "a": "Important in cases of injury or surgical ligation of the brachial artery",
      "svg": "artery"
    }
  ],
  "cubital-fossa": [
    {
      "q": "What is Median cubital vein?",
      "a": "Is the venous communication between basilica and cephalic vein",
      "svg": "artery"
    }
  ],
  "deltoid": [
    {
      "q": "Nerve supply?",
      "a": "Intramuscular injections are given to deltoid",
      "svg": "nerve"
    },
    {
      "q": "Action?",
      "a": "Intramuscular injections are given to deltoid",
      "svg": null
    }
  ],
  "elbow-joint": [
    {
      "q": "What is Posterior elbow geometry?",
      "a": "In flexed state – lateral epicondyle, medial epicondyle and tip of olecranon process forms an equilateral triangle.",
      "svg": null
    },
    {
      "q": "What is Movements and muscles?",
      "a": "In flexed state – lateral epicondyle, medial epicondyle and tip of olecranon process forms an equilateral triangle.",
      "svg": "muscle"
    },
    {
      "q": "What is Pathology of elbow?",
      "a": "Lateral tennis elbow – affects the tendinous origin of common wrist extensors",
      "svg": null
    }
  ],
  "first-carpometacarpal-joint": [
    {
      "q": "What is Type?",
      "a": "Saddle type of synovial joint",
      "svg": null
    },
    {
      "q": "What is Articulating surfaces?",
      "a": "Lines the joint capsule and is separate from it",
      "svg": null
    },
    {
      "q": "What is Ligaments?",
      "a": "Lines the joint capsule and is separate from it",
      "svg": null
    },
    {
      "q": "What is Synovial membrane?",
      "a": "Lines the joint capsule and is separate from it",
      "svg": null
    },
    {
      "q": "What is Vascular supply?",
      "a": "Radial artery and its first dorsal metacarpal branch",
      "svg": "artery"
    },
    {
      "q": "What is Innervation?",
      "a": "Articular twigs from the posterior interosseous nerve",
      "svg": "nerve"
    }
  ],
  "humerus": [
    {
      "q": "What is Upper end?",
      "a": "[IMP]Surgical neck of humerus is related to axillary nerve with posterior and anterior circumflex humeral vessels",
      "svg": "artery"
    },
    {
      "q": "What is Nerves related to humerus?",
      "a": "Axillary nerve – around neck of humerus",
      "svg": "nerve"
    }
  ],
  "latissimus-dorsi": [
    {
      "q": "Nerve supply?",
      "a": "thoraco-dorsal nerve",
      "svg": "nerve"
    },
    {
      "q": "Action?",
      "a": "Intermuscular gap in posterior thoracic wall",
      "svg": null
    },
    {
      "q": "What is Triangle of auscultation?",
      "a": "Intermuscular gap in posterior thoracic wall",
      "svg": null
    }
  ],
  "median-nerve": [
    {
      "q": "What is Formation?",
      "a": "Union of medial root (branch of medial cord) with lateral root (branch of lateral cord of brachial plexus) – ‘Y’ shaped union",
      "svg": null
    },
    {
      "q": "What is Anterior Interosseous Nerve?",
      "a": "It ends by supplying distal radioulnar, radiocarpal and carpal articulations",
      "svg": "nerve"
    },
    {
      "q": "What is Innervates?",
      "a": "It ends by supplying distal radioulnar, radiocarpal and carpal articulations",
      "svg": null
    }
  ],
  "movements-of-thumb-and-other-fingers": [
    {
      "q": "What is Opposition of the Thumb?",
      "a": "Opposition depends primarily on function of the intrinsic muscles of the thumb, especially the abductor pollicis brevis",
      "svg": "muscle"
    },
    {
      "q": "What is Abductor pollicis brevis?",
      "a": "Opposition is either partially or totally lost in poliomyelitis or median nerve palsy.",
      "svg": "nerve"
    },
    {
      "q": "What is Restoration of opposition?",
      "a": "Opposition is either partially or totally lost in poliomyelitis or median nerve palsy.",
      "svg": "nerve"
    }
  ],
  "palmar-arterial-arches": [
    {
      "q": "What is Superficial palmar arch?",
      "a": "Located between palmar aponeurosis and long flexors tendons",
      "svg": null
    },
    {
      "q": "What is Deep palmar arch?",
      "a": "Located deep in the palm between flexor tendons and intersossei muscles",
      "svg": "muscle"
    },
    {
      "q": "What is Applied anatomy?",
      "a": "Allen’s test: Allen test measures arterial competency, and should be performed before taking an arterial sample.",
      "svg": null
    },
    {
      "q": "What is Location?",
      "a": "Located between palmar aponeurosis and long flexors tendons",
      "svg": null
    },
    {
      "q": "What is Formation?",
      "a": "Convex line drawn at distal border of fully extended thumb across the palm to meet hook of the hamate represents the superficial arch",
      "svg": null
    },
    {
      "q": "What is Branches?",
      "a": "Convex line drawn at distal border of fully extended thumb across the palm to meet hook of the hamate represents the superficial arch",
      "svg": null
    }
  ],
  "radial-nerve": [
    {
      "q": "What is Root value?",
      "a": "C5, 6, 7, 8 and T1",
      "svg": null
    },
    {
      "q": "What is Formation?",
      "a": "Originates as a terminal branch of the posterior cord of the brachial plexus",
      "svg": null
    },
    {
      "q": "What is Branches from posterior interosseous nerve?",
      "a": "1. Shaft of humerus fracture",
      "svg": "nerve"
    },
    {
      "q": "What is Injuries to radial nerve in spiral groove – 5S?",
      "a": "1. Shaft of humerus fracture",
      "svg": "nerve"
    }
  ],
  "radius-and-ulna": [
    {
      "q": "What is Ulna?",
      "a": "Ulna is the medial bone of the forearm. It is the postaxial bone of the upperlimb",
      "svg": "bone"
    },
    {
      "q": "What is Radius?",
      "a": "Radius is the lateral bone of the forearm. It is the preaxial bone of the upperlimb",
      "svg": "bone"
    },
    {
      "q": "What is Upper end?",
      "a": "Olecranon - curved eminence in the upper end, receives insertion of triceps",
      "svg": null
    },
    {
      "q": "What is Body (shaft)?",
      "a": "Borders - anterior, posterior and lateral border",
      "svg": null
    },
    {
      "q": "What is Lower end (head of ulna)?",
      "a": "Articulates with the upper surface of the triangular articular disc",
      "svg": null
    }
  ],
  "rotator-cuff-muscles": [
    {
      "q": "Articulating surfaces?",
      "a": "Encloses tendon of long head of biceps.",
      "svg": null
    },
    {
      "q": "Orientation of the joint?",
      "a": "Encloses tendon of long head of biceps.",
      "svg": null
    },
    {
      "q": "Type of joint?",
      "a": "Encloses tendon of long head of biceps.",
      "svg": null
    },
    {
      "q": "What is Capsule of joint?",
      "a": "Encloses tendon of long head of biceps.",
      "svg": null
    },
    {
      "q": "What is Synovial membrane?",
      "a": "Lines the inner aspect of joint capsule. Projects along the tendon of long head of biceps. Communicates with few bursae.",
      "svg": null
    },
    {
      "q": "What is Stability of shoulder joint?",
      "a": "Applied aspects:",
      "svg": null
    },
    {
      "q": "What is Frozen shoulder?",
      "a": "Definition – painful restriction of both active and passive shoulder movements due to causes within the shoulder joint or remote",
      "svg": null
    },
    {
      "q": "What is Glenohumeral ligaments?",
      "a": "Gap between superior and middle glenohumeral ligaments is of noted significance in anterior dislocation of shoulder",
      "svg": null
    }
  ],
  "shoulder-joint": [
    {
      "q": "Articulating surfaces?",
      "a": "[NOTE}Encloses tendon of long head of biceps.",
      "svg": null
    },
    {
      "q": "Orientation of the joint?",
      "a": "[NOTE}Encloses tendon of long head of biceps.",
      "svg": null
    },
    {
      "q": "Type of joint?",
      "a": "[NOTE}Encloses tendon of long head of biceps.",
      "svg": null
    },
    {
      "q": "What is Capsule of joint?",
      "a": "[NOTE}Encloses tendon of long head of biceps.",
      "svg": null
    },
    {
      "q": "What is Synovial membrane?",
      "a": "Lines the inner aspect of joint capsule. Projects along the tendon of long head of biceps. Communicates with few bursae.",
      "svg": null
    },
    {
      "q": "What is Relations of shoulder joint?",
      "a": "[IMP]Learn to draw the diagram",
      "svg": null
    },
    {
      "q": "What is Stability of shoulder joint?",
      "a": "Applied aspects:",
      "svg": null
    },
    {
      "q": "What is Frozen shoulder?",
      "a": "Definition – painful restriction of both active and passive shoulder movements due to causes within the shoulder joint or remote",
      "svg": null
    }
  ],
  "spaces-of-hand": [
    {
      "q": "What is Midpalmar space?",
      "a": "Lumbrical canals = pus taps, through web spaces",
      "svg": null
    },
    {
      "q": "What is Thenar space?",
      "a": "Lumbrical canals = pus taps, through web spaces",
      "svg": null
    },
    {
      "q": "What is Infection in the hand?",
      "a": "Effects of infection of hand can be devastating as it leads to severe pain and loss of functionality.",
      "svg": null
    },
    {
      "q": "Boundaries?",
      "a": "Lumbrical canals = pus taps, through web spaces",
      "svg": null
    },
    {
      "q": "What is Tenosynovitis?",
      "a": "Inflammation of synovial sheath surrounding a tendon",
      "svg": null
    }
  ],
  "supination-and-pronation": [
    {
      "q": "Definition?",
      "a": "Movement of lower end of radius over ulna in such a way that it crosses it and comes to lie medially is called pronation. With such movement – palm faces downwards with a semiflexed elbow",
      "svg": null
    }
  ],
  "surgical-anatomy-of-breast": [
    {
      "q": "What is Deep fascia and mammary gland?",
      "a": "Deep fascia in the region of breast is the fascia covering the pectoral muscle.",
      "svg": "muscle"
    },
    {
      "q": "What is Suspensory ligament?",
      "a": "Suspensory ligaments of Cooper are special connective tissue bands, anchoring the breast parenchyma.",
      "svg": null
    },
    {
      "q": "What is Mammary bed?",
      "a": "Three muscles form the base of breast.",
      "svg": "muscle"
    },
    {
      "q": "What is Nipple?",
      "a": "Nipple is covered by thin hairless skin, having numerous sweat and sebaceous glands which open directly onto the skin surface.",
      "svg": null
    },
    {
      "q": "What is Montegomery tubercles?",
      "a": "Specialized sebaceous glands enlarge during pregnancy and form subcutaneous tubercles called Montegomery tubercles.",
      "svg": null
    },
    {
      "q": "What is Venous drainage of breast and spread of tumor?",
      "a": "Most veins from breast follow arteries. The axillary, internal thoracic, and the third to fifth intercostal veins drain the mammary gland.",
      "svg": "artery"
    },
    {
      "q": "What is Breast quadrants?",
      "a": "Breast is divided into four quadrants",
      "svg": null
    },
    {
      "q": "What is Development?",
      "a": "• Breast develops from epidermis",
      "svg": null
    }
  ],
  "ulnar-nerve": [
    {
      "q": "What is Humorous!?",
      "a": "Irritation of this nerve is commonly referred to as hitting one's \"funny bone.\"",
      "svg": "nerve"
    },
    {
      "q": "What is Formation?",
      "a": "Branch of medial cord of brachial plexus",
      "svg": null
    },
    {
      "q": "What is Deep terminal branch?",
      "a": "1. Froment’s sign: patient holds the book between thumb and index fingers against resistance. Three muscles are tested – first palmar interossei, adductor pollicis and flexor pollicis longus.",
      "svg": "muscle"
    },
    {
      "q": "What is Tests for ulnar nerve?",
      "a": "1. Froment’s sign: patient holds the book between thumb and index fingers against resistance. Three muscles are tested – first palmar interossei, adductor pollicis and flexor pollicis longus.",
      "svg": "nerve"
    },
    {
      "q": "What is Guyon canal?",
      "a": "Is an oblique fibro-osseous tunnel that lays within the proximal part of the hypothenar eminence;",
      "svg": "bone"
    },
    {
      "q": "What is Palmar cutaneous branch of ulnar nerve?",
      "a": "1. Froment’s sign: patient holds the book between thumb and index fingers against resistance. Three muscles are tested – first palmar interossei, adductor pollicis and flexor pollicis longus.",
      "svg": "nerve"
    },
    {
      "q": "What is Dorsal branch?",
      "a": "1. Froment’s sign: patient holds the book between thumb and index fingers against resistance. Three muscles are tested – first palmar interossei, adductor pollicis and flexor pollicis longus.",
      "svg": "muscle"
    },
    {
      "q": "What is Superficial terminal branch?",
      "a": "1. Froment’s sign: patient holds the book between thumb and index fingers against resistance. Three muscles are tested – first palmar interossei, adductor pollicis and flexor pollicis longus.",
      "svg": "muscle"
    }
  ]
};
  // Empty - all auto-generated cards removed
  // Ready for manually provided flashcards

if (typeof window !== 'undefined') {
  window.flashcardsData = flashcardsData;
}
