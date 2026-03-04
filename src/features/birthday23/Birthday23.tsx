import { useState, useEffect, useRef } from "react";
import { Heart, Music, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import YouTube from "react-youtube";
import "./Birthday23.css";

const floatItems = [
  { emoji: "🤍", left: "4%", top: "12%" },
  { emoji: "✨", left: "15%", top: "58%" },
  { emoji: "🌸", left: "83%", top: "20%" },
  { emoji: "💕", left: "91%", top: "65%" },
  { emoji: "⭐", left: "53%", top: "7%" },
  { emoji: "🌟", left: "70%", top: "80%" },
  { emoji: "💫", left: "27%", top: "88%" },
  { emoji: "🎀", left: "44%", top: "30%" },
];

const candles = [{ cls: "c-pink" }, { cls: "c-amber" }, { cls: "c-purple" }];

const Birthday23 = () => {
  const [showContent, setShowContent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [cardOpened, setCardOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showCake, setShowCake] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [blowingCandle, setBlowingCandle] = useState(false);
  const [micPermission, setMicPermission] = useState(false);
  const [blowStrength, setBlowStrength] = useState(0);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!cardOpened) return;
    const t1 = setTimeout(() => setShowLetter(true), 400);
    const t2 = setTimeout(() => setShowCake(true), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [cardOpened]);

  const opts = {
    height: "0",
    width: "0",
    playerVars: { autoplay: 1, loop: 1, playlist: "9boiT64sm0Q" },
  };

  const onReady = (event: any) => {
    playerRef.current = event.target;
    playerRef.current.playVideo();
  };

  const toggleMusic = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const requestMicPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setMicPermission(true);

      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      audioContext.createMediaStreamSource(stream).connect(analyser);
      analyser.fftSize = 256;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      let isBlown = false;

      const check = () => {
        if (isBlown) return;
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        setBlowStrength(avg);
        if (avg > 50) {
          isBlown = true;
          setBlowingCandle(true);
          setTimeout(() => setCandlesBlown(true), 900);
          return;
        }
        requestAnimationFrame(check);
      };
      requestAnimationFrame(check);
    } catch (err) {
      console.error("Mic error:", err);
    }
  };

  return (
    <div className="bday23-container">
      <YouTube videoId="9boiT64sm0Q" opts={opts} onReady={onReady} />

      <motion.button
        onClick={toggleMusic}
        className="bday23-music-btn"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={isPlaying ? "Pause music" : "Play music"}
      >
        <Music size={18} />
      </motion.button>

      <section className="bday23-content">
        {/* Floating decorations */}
        <div className="bday23-floats">
          {floatItems.map((item, i) => (
            <motion.div
              key={i}
              className="bday23-float"
              style={{ left: item.left, top: item.top }}
              animate={{
                y: [-12, 12, -12],
                rotate: [-5, 5, -5],
                opacity: [0.25, 0.55, 0.25],
              }}
              transition={{
                duration: 4 + i * 0.7,
                repeat: Infinity,
                delay: i * 0.45,
                ease: "easeInOut",
              }}
            >
              {item.emoji}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bday23-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: showContent ? 1 : 0,
            y: showContent ? 0 : 30,
          }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {!cardOpened ? (
            /* ---- Envelope Card ---- */
            <motion.div
              className="bday23-envelope"
              onClick={() => setCardOpened(true)}
              whileHover={{ scale: 1.03, rotate: 1 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="bday23-envelope-inner">
                <motion.div
                  className="bday23-emoji-main"
                  animate={{
                    rotate: [0, 8, -8, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  🎂
                </motion.div>

                <motion.h2
                  className="bday23-card-title"
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  untuk cumi cayangg~
                </motion.h2>

                <motion.p
                  className="bday23-card-subtitle"
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.65 }}
                >
                  tap to open ❤️
                </motion.p>

                <motion.div
                  className="bday23-card-bottom"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Heart fill="white" size={22} />
                </motion.div>
              </div>

              <div className="bday23-deco deco-tl" />
              <div className="bday23-deco deco-br" />
              <div className="bday23-deco deco-tr" />
            </motion.div>
          ) : (
            <AnimatePresence>
              {/* ---- Letter ---- */}
              {showLetter && (
                <motion.div
                  className="bday23-letter"
                  initial={{ opacity: 0, y: 50, scale: 0.93 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                >
                  <div className="bday23-letter-header">
                    <motion.div
                      className="bday23-header-emojis"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      🤍🎂✨
                    </motion.div>

                    <motion.h1
                      className="bday23-title"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      happyy birthday
                      <span>cumi cayanggg~</span>
                    </motion.h1>

                    <motion.div
                      className="bday23-age-circle"
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.5,
                        type: "spring",
                        stiffness: 220,
                      }}
                    >
                      23
                    </motion.div>
                  </div>

                  <motion.div
                    className="bday23-letter-body"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="bday23-divider" />

                    <p>
                      ga kerasa kita udah lewatin 2x ulang tahun kamu, makacihhh
                      banyakk cinta manis aku for always being there for me.
                    </p>

                    <p>makasihhh udaa jadi best part of my days 🌸</p>

                    <p>
                      semoga kita makin sama-sama berproses buat lebih baik lagi
                      yaa cayangg.
                    </p>

                    <p>
                      semoga kamu makin happy, makin sukses, dan semua wish kamu
                      bisa terwujudd ✨
                    </p>

                    <p>
                      i just need you with our dailyy flat boring but still with
                      kisses 🫶
                    </p>

                    <p>
                      i'm always here rooting for you, can't wait to make more
                      memories with you.
                    </p>

                    <p>
                      semoga di tahun kedepannya kita bisa celebrate bareng yaaa
                      🎂
                    </p>

                    <div className="bday23-letter-closing">
                      <p className="bday23-signature">Love you tons 🤍🎂✨</p>
                      <p className="bday23-from">— Riza</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* ---- Cake ---- */}
              {showCake && (
                <motion.div
                  className="bday23-cake-section"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2>Make a wish! 🌟</h2>

                  <div className="bday23-cake-wrap">
                    {/* Candles */}
                    <div className="bday23-candles">
                      {candles.map(({ cls }, i) => (
                        <div key={i} className="bday23-candle">
                          {!candlesBlown && (
                            <div
                              className={`bday23-flame ${
                                blowingCandle ? "extinguished" : ""
                              }`}
                            >
                              <Flame size={20} />
                            </div>
                          )}
                          <div className={`bday23-candle-body ${cls}`} />
                        </div>
                      ))}
                    </div>

                    {/* Cake layers */}
                    <div className="bday23-cake-body">
                      <div className="bday23-cake-layer-top">
                        <div className="bday23-cake-frosting" />
                        <div className="bday23-cake-num">23</div>
                      </div>
                      <div className="bday23-cake-layer-mid" />
                      <div className="bday23-cake-layer-bot" />
                    </div>
                    <div className="bday23-cake-plate" />
                  </div>

                  {/* Interactions */}
                  <div className="bday23-interaction">
                    {!candlesBlown && !micPermission && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <motion.button
                          onClick={requestMicPermission}
                          className="bday23-blow-btn"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Tiup lilinnya! 🎂
                        </motion.button>
                        <p className="bday23-blow-hint">
                          (allow microphone access nya cayang)
                        </p>
                      </motion.div>
                    )}

                    {!candlesBlown && micPermission && (
                      <motion.div
                        className="bday23-mic-active"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <p>Tiup ke microphone! 💨</p>
                        <div className="bday23-bar">
                          <motion.div
                            className="bday23-bar-fill"
                            style={{
                              width: `${Math.min(blowStrength * 2, 100)}%`,
                            }}
                            transition={{
                              duration: 0.3,
                            }}
                          />
                        </div>
                      </motion.div>
                    )}

                    {candlesBlown && (
                      <motion.div
                        className="bday23-blown"
                        initial={{
                          opacity: 0,
                          scale: 0.85,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <p>Yay! Happy 23rd Birthday cumi! 🎉🤍</p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default Birthday23;
