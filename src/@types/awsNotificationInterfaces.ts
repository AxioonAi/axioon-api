import { Status } from "@prisma/client";

export interface AwsNotificationYoutubeCommentsAwsDataInterface {
  cid: string;
  comment: string;
  voteCount: number;
  replyCount: number;
  author: string;
  videoId: string;
}

export interface AwsNotificationYoutubeCommentsResponseInterface {
  id: string;
  video_id: string;
  text: string;
  likeCount: number;
  replyCount: number;
  author: string;
  [key: string]: string | number;
}

export interface AwsNotificationTiktokCommentsAwsDataInterface {
  cid: string;
  submittedVideoUrl: string;
  text: string;
  diggCount: number;
  createTimeISO: Date;
  replyCommentTotal: number;
  uniqueId: string;
}

export interface AwsNotificationTiktokCommentsResponseInterface {
  id: string;
  video_id: string;
  text: string;
  diggCount: number;
  date: Date;
  replyCount: number;
  author: string;
}

export interface AwsNotificationInstagramPostAwsDataInterface {
  id: string;
  url: string;
  caption: string;
  commentsCount: number;
  likesCount: number;
  timestamp: Date;
  type: string;
  videoViewCount: number;
  videoPlayCount: number;
  displayUrl: string;
  postId: string;
  ownerUsername: string;
  instagram_id: string;
}

export interface AwsNotificationInstagramPostResponseInterface {
  id: string;
  postUrl: string;
  description: string;
  commentCount: number;
  likeCount: number;
  pubDate: Date;
  viewCount: number;
  playCount: number;
  username: string;
  imgUrl: string;
  postId: string;
  politician_id: string;
}

export interface AwsNotificationYoutubeVideoAwsDataInterface {
  id: string;
  title: string;
  text: string;
  url: string;
  duration: string;
  date: string;
  thumbnailUrl: string;
  viewCount: number;
  commentsCount: number;
  likes: number;
  channel_id: string;
}

export interface AwsNotificationYoutubeVideoResponseInterface {
  id: string;
  title: string;
  url: string;
  duration: string;
  viewCount: number;
  commentsCount: number;
  likes: number;
  date: Date;
  description: string;
  imgUrl: string;
  politician_id: string;
}

export interface AwsNotificationFacebookProfileAwsDataInterface {
  id: string;
  likes: number;
  title: string;
  followers: number;
  facebook_id: string;
}

export interface AwsNotificationFacebookProfileResponseInterface {
  likes_count: number;
  title: string;
  followers_count: number;
  politician_id: string;
}

export interface AwsNotificationInstagramCommentsAwsDataInterface {
  id: string;
  text: string;
  likesCount: number;
  timestamp: Date;
  ownerUsername: string;
  instagram_id: string;
  postUrl: string;
  ownerProfilePicUrl: string;
}

export interface AwsNotificationInstagramCommentsResponseInterface {
  id: string;
  text: string;
  ownerProfilePicUrl: string;
  post_id: string;
  ownerUsername: string;
  timestamp: Date;
  likeCount: number;
}

export interface AwsNotificationInstagramProfileAwsDataInterface {
  instagram_id: string;
  followersCount: number;
  followsCount: number;
  postsCount: number;
  igtvVideoCount: number;
  isBusinessAccount: boolean;
  verified: boolean;
  biography: string;
  url: string;
  fullName: string;
  profilePicUrlHD: string;
}

export interface AwsNotificationInstagramEngagerAwsDataInterface {
  engager_id: string;
  followersCount: number;
  followsCount: number;
  postsCount: number;
  igtvVideoCount: number;
  isBusinessAccount: boolean;
  verified: boolean;
  biography: string;
  url: string;
  fullName: string;
  profilePicUrlHD: string;
}

export interface AwsNotificationInstagramProfileResponseInterface {
  politician_id: string;
  followers: number;
  follows: number;
  posts_count: number;
  reels_count: number;
  business: boolean;
  verified: boolean;
  biography: string;
  url: string;
  fullName: string;
  profilePicture: string;
}

export interface AwsNotificationInstagramEngagerResponseInterface {
  engagerId: string;
  followers: number;
  follows: number;
  posts_count: number;
  reels_count: number;
  business: boolean;
  verified: boolean;
  biography: string;
  url: string;
  fullName: string;
  profilePicture: string;
}

export interface AwsNotificationTiktokEngagerResponseInterface {
  fans: number;
  verified: boolean;
  avatar: string;
  heart: number;
  engagerId: string;
}

export interface AwsNotificationTiktokProfileAwsDataInterface {
  tiktok_id: string;
  authorMeta: {
    fans: number;
    video: number;
    verified: boolean;
    avatar: string;
    heart: number;
    name: string;
    nickName: string;
  };
  id: string;
  text: string;
  diggCount: number;
  createTimeISO: Date;
  shareCount: number;
  commentCount: number;
  playCount: number;
  webVideoUrl: string;
}
export interface AwsNotificationTiktokEngagerAwsDataInterface {
  tiktok_id: string;
  authorMeta?: {
    fans: number;
    video: number;
    verified: boolean;
    avatar: string;
    heart: number;
    name: string;
    nickName: string;
  };
  name: string;
  nickName: string;
  fans: number;
  verified: boolean;
  avatar: string;
  heart: number;
}

export interface AwsNotificationTiktokHashtagMentionAwsDataInterface {
  authorMeta: {
    avatar: string;
    name: string;
  };
  hashtag_id: string;
  text: string;
  diggCount: number;
  createTimeISO: Date;
  shareCount: number;
  commentCount: number;
  playCount: number;
  webVideoUrl: string;
}

export interface AwsNotificationTiktokProfileResponseInterface {
  profileData: {
    fans: number;
    videos: number;
    verified: boolean;
    avatar: string;
    heart: number;
    politician_id: string;
  }[];
  videoData: {
    politician_id: string;
    id: string;
    text: string;
    diggCount: number;
    date: Date;
    shareCount: number;
    commentCount: number;
    playCount: number;
    url: string;
  }[];
}

export interface AwsNotificationTiktokHashtagMentionResponseInterface {
  hashtagId: string;
  id: string;
  description: string;
  diggCount: number;
  date: Date;
  shareCount: number;
  commentCount: number;
  playCount: number;
  authorAvatar: string;
  authorName: string;
  url: string;
}

export interface AwsNotificationTiktokProfileFormattedDataInterface {
  [politicianId: string]: {
    videos: {
      id: string;
      text: string;
      diggCount: number;
      shareCount: number;
      playCount: number;
      commentCount: number;
      date: Date;
      url: string;
      politician_id: string;
    }[];
    profile: {
      fans: number;
      name: string;
      nickname: string;
      videos: number;
      verified: boolean;
      politician_id: string;
      avatar: string;
      heart: number;
    };
  };
}

export interface AwsNotificationFacebookPostAwsDataInterface {
  postId: string;
  text: string;
  url: string;
  time: Date;
  likes: number;
  comments: number;
  shares: number;
  media: {
    thumbnail: string;
  }[];
  facebook_id: string;
}

export interface AwsNotificationFacebookPostResponseInterface {
  id: string;
  text: string;
  url: string;
  date: Date;
  like: number;
  shares: number;
  comments: number;
  thumbnail: string;
  politician_id: string;
}

export interface AwsNotificationFacebookCommentsAwsDataInterface {
  id: string;
  text: string;
  likesCount: number;
  date: Date;
  profileName: string;
  facebookId: string;
  facebookUrl: string;
}

export interface AwsNotificationFacebookCommentsResponseInterface {
  id: string;
  postUrl: string;
  text: string;
  likeCount: number;
  date: Date;
  username: string;
  post_id: string;
}

export interface AwsNotificationYoutubeChannelAwsDataInterface {
  id: string;
  channelName: string;
  channelTotalViews: string;
  numberOfSubscribers: number;
  channelTotalVideos: number;
  channel_id: string;
}

export interface AwsNotificationYoutubeChannelResponseInterface {
  id: string;
  channel_name: string;
  channel_total_views: number;
  channel_total_subs: number;
  channel_total_videos: number;
  date: Date;
  politician_id: string;
}

export interface AwsNotificationInstagramMentionAwsDataInterface {
  instagram_id: string;
  id: string;
  url: string;
  caption: string;
  commentsCount: number;
  likesCount: number;
  timestamp: Date;
  type: string;
  videoViewCount: number;
  videoPlayCount: number;
  ownerUsername: string;
  displayUrl: string;
  ownerFullName: string;
  hashtags: string[];
}

export interface AwsNotificationInstagramHashtagMentionAwsDataInterface {
  hashtag_id: string;
  id: string;
  url: string;
  caption: string;
  commentsCount: number;
  likesCount: number;
  timestamp: Date;
  type: string;
  videoViewCount: number;
  videoPlayCount: number;
  ownerUsername: string;
  displayUrl: string;
  ownerFullName: string;
  hashtags: string[];
}

export interface AwsNotificationInstagramMentionResponseInterface {
  id: string;
  postUrl: string;
  description: string;
  commentCount: number;
  likeCount: number;
  pubDate: Date;
  viewCount: number;
  playCount: number;
  username: string;
  imgUrl: string;
  postId: string;
  politician_id: string;
  ownerFullName: string;
  ownerUsername: string;
  hashtags: string;
}

export interface AwsNotificationInstagramHashtagMentionResponseInterface {
  id: string;
  postUrl: string;
  description: string;
  commentCount: number;
  likeCount: number;
  pubDate: Date;
  viewCount: number;
  playCount: number;
  username: string;
  imgUrl: string;
  postId: string;
  hashtagId: string;
  ownerFullName: string;
  ownerUsername: string;
  hashtags: string;
}

export interface AwsNotificationFacebookAdsAwsDataInterface {
  data: {
    id: string;
    ad_creation_time: Date;
    ad_delivery_stop_time: Date;
    ad_delivery_start_time: Date;
    ad_snapshot_url: string;
    currency: string;
    page_name: string;
    bylines: string;
    spend: { lower_bound: string; upper_bound: string };
    impressions: { lower_bound: string; upper_bound: string };
    delivery_by_region: {
      region: string;
      percentage: string;
    }[];
    demographic_distribution: {
      age: string;
      gender: string;
      percentage: string;
    }[];
  }[];
  Meta_id: string;
}

export interface AwsNotificationFacebookAdsResponseInterface {
  advertisingData: {
    id: string;
    politician_id: string;
    ad_creation_time: Date;
    ad_delivery_stop_time: Date | null;
    ad_delivery_start_time: Date;
    ad_snapshot_url: string;
    currency: string;
    page_name: string;
    bylines: string;
    status: Status;
    spend_lower_bound: string;
    spend_upper_bound: string;
    impressions_lower_bound: string;
    impressions_upper_bound: string;
  }[];
  deliveryRegionData: {
    region: string;
    advertising_id: string;
    percentage: string;
  }[];
  demographicDistributionData: {
    advertising_id: string;
    age: string;
    gender: string;
    percentage: string;
  }[];
}

export interface AwsNotificationNewsAwsDataInterface {
  title: string;
  site_id: string;
  link: string;
  content: string[];
  updated: Date;
  users: {
    name: string;
    id: string;
  }[];
}

export interface AwsNotificationNewsResponseInterface {
  title: string;
  url: string;
  content: string[];
  website_id: string | null;
  last_update: Date;
  users: {
    name: string;
    user_id: string;
  }[];
}

export interface AwsNotificationLegalResponseInterface {
  politician_id: string;
  subject: string | null;
  judgingBy: string | null;
  causeValue: string | null;
  court: string | null;
  url: string | null;
  id: string;
  activePole: string;
  passivePole: string;
  startDate: Date;
  lastUpdate: Date;
}

export interface AwsNotificationLegalDataInterface {
  envolvido_encontrado: {
    nome: string;
  };
  items: {
    numero_cnj: string;
    titulo_polo_ativo: string;
    titulo_polo_passivo: string;
    ano_inicio: number;
    data_inicio: string;
    estado_origem: Estado;
    data_ultima_movimentacao: string;
    quantidade_movimentacoes: number;
    fontes_tribunais_estao_arquivadas: boolean;
    data_ultima_verificacao: string;
    tempo_desde_ultima_verificacao: string;
    tipo_match: string;
    match_fontes: MatchFontes;
    fontes: {
      data_inicio: string;
      capa: Capa | null;
      url: string | null;
      tribunal: Tribunal;
      sistema: string;
      segredo_justica: boolean;
      grau_formatado: string;
      quantidade_envolvidos: number;
      quantidade_movimentacoes: number;
      data_ultima_verificacao: string;
      tipos_envolvido_pesquisado: TipoEnvolvidoPesquisado[];
      match_documento_por: string | null;
    }[];
  }[];
  user_id: string;
}

interface Estado {
  nome: string;
  sigla: string;
}

interface MatchFontes {
  tribunal: boolean;
  diario_oficial: boolean;
}

interface Capa {
  classe: string;
  assunto: string;
  area: string;
  assunto_principal_normalizado: {
    nome: string;
  };
  orgao_julgador: string;
  valor_causa: {
    valor: string;
    moeda: string;
    valor_formatado: string;
  };
}

interface Tribunal {
  id: number;
  nome: string;
  sigla: string;
}

interface TipoEnvolvidoPesquisado {
  id: number;
  tipo: string;
  tipo_normalizado: string;
  polo: string;
}
