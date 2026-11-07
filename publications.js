// Metadata verified against the linked official arXiv abstract pages.
// The two Scholar entries for arXiv:2604.18486 are one publication.
window.SITE_PUBLICATIONS = [
  {
    title: "DriveUniTok: A Unified Multimodal Tokenizer for Driving World-Action Models",
    authors: [
      "Jingbo Xu",
      "Hanchao Leng",
      "JiaHui Huang",
      "Hanbing Li",
      "Jingwei Zhao",
      "Kuiyuan Yang",
      "Chen Gao",
      "Guang Chen",
      "Hangjun Ye",
      "Yong Li"
    ],
    year: 2026,
    venue: "arXiv preprint",
    url: "https://arxiv.org/abs/2610.35044",
    arxiv: "2610.35044",
    pdf: "https://arxiv.org/pdf/2610.35044",
    citationFile: "assets/citations/driveunitok.bib",
    figure: {
      src: "assets/publications/driveunitok.png",
      width: 2019,
      height: 1388,
      source: "https://arxiv.org/html/2610.35044v1#S3.F2",
      attribution: "Xu et al., 2026",
      caption: { en: "DriveUniTok architecture (Figure 2)", zh: "DriveUniTok 模型架构（图 2）" },
      alt: {
        en: "DriveUniTok encoder and decoder: shared queries combine RGB, projected LiDAR depth, and ego pose into a unified multimodal latent representation.",
        zh: "DriveUniTok 编码器与解码器：共享查询将 RGB、投影 LiDAR 深度和自车位姿融合为统一多模态潜变量。"
      }
    },
    researchQuestion: {
      en: "How can appearance, geometry, and ego motion be modeled together for consistent future prediction and planning?",
      zh: "如何统一建模视觉外观、几何与自车运动，使未来场景预测和驾驶规划保持一致？"
    },
    summary: {
      en: "DriveUniTok learns a jointly decodable continuous representation of RGB, projected LiDAR depth, and ego pose. A shared-query encoder aligns these modalities; the resulting tokens provide a unified interface for a world-action model to predict future observations and driving trajectories.",
      zh: "DriveUniTok 通过共享查询对齐 RGB、投影 LiDAR 深度与自车位姿，学习可联合解码的连续潜变量。统一表征为世界动作模型提供预测接口，将未来观测与驾驶轨迹的生成连接起来。"
    }
  },
  {
    title: "Xiaomi OneVL: One-Step Latent Reasoning and Planning with Vision-Language Explanation",
    authors: [
      "Jinghui Lu",
      "Jiayi Guan",
      "Zhijian Huang",
      "Jinlong Li",
      "Guang Li",
      "Lingdong Kong",
      "Yingyan Li",
      "Han Wang",
      "Shaoqing Xu",
      "Yuechen Luo",
      "Fang Li",
      "Chenxu Dang",
      "Junli Wang",
      "Tao Xu",
      "Jing Wu",
      "Jianhua Wu",
      "Xiaoshuai Hao",
      "Wen Zhang",
      "Tianyi Jiang",
      "Lingfeng Zhang",
      "Lei Zhou",
      "Yingbo Tang",
      "Jie Wang",
      "Yinfeng Gao",
      "Xizhou Bu",
      "Haochen Tian",
      "Yihang Qiu",
      "Feiyang Jia",
      "Lin Liu",
      "Yigu Ge",
      "Hanbing Li",
      "Yuannan Shen",
      "Jianwei Cui",
      "Hongwei Xie",
      "Bing Wang",
      "Haiyang Sun",
      "Jingwei Zhao",
      "Jiahui Huang",
      "Pei Liu",
      "Zeyu Zhu",
      "Yuncheng Jiang",
      "Zibin Guo",
      "Chuhong Gong",
      "Hanchao Leng",
      "Kun Ma",
      "Naiyan Wang",
      "Guang Chen",
      "Kuiyuan Yang",
      "Hangjun Ye",
      "Long Chen"
    ],
    year: 2026,
    venue: "arXiv preprint",
    url: "https://arxiv.org/abs/2604.18486",
    arxiv: "2604.18486",
    pdf: "https://arxiv.org/pdf/2604.18486",
    citationFile: "assets/citations/onevl.bib",
    figure: {
      src: "assets/publications/onevl.png",
      width: 1791,
      height: 933,
      source: "https://xiaomi-embodied-intelligence.github.io/OneVL/#architecture",
      attribution: "Xiaomi Embodied Intelligence Team",
      license: "https://creativecommons.org/licenses/by-sa/4.0/",
      caption: { en: "OneVL: dual-modal latent reasoning", zh: "OneVL：双模态潜在推理框架" },
      alt: {
        en: "OneVL architecture: compact visual and language latent tokens receive supervision from future-frame prediction and language reconstruction while supporting trajectory prediction.",
        zh: "OneVL 模型架构：视觉与语言潜变量接受未来帧预测和语言重建的双重监督，同时支持驾驶轨迹预测。"
      }
    },
    researchQuestion: {
      en: "How can a driving policy benefit from reasoning without the latency of autoregressive chain-of-thought generation?",
      zh: "如何让驾驶策略受益于推理，同时降低自回归思维链生成带来的延迟？"
    },
    summary: {
      en: "OneVL couples compact latent reasoning with two training-time decoders: one reconstructs language explanations, while the other predicts future visual tokens. Joint supervision links reasoning to scene dynamics; inference processes the latent tokens in parallel and predicts a driving trajectory without running the auxiliary decoders.",
      zh: "OneVL 使用语言重建与未来视觉预测两个训练期辅助解码器，监督紧凑的潜在推理表征，将推理与场景动态联系起来。推理阶段移除辅助解码器，并行处理潜变量并生成驾驶轨迹。"
    }
  }
];
