export type Part = 'engine' | 'cvt' | 'wheels' | 'suspension' | 'brakes' | 'electrical';

export type Service = {
  part: Part;
  name: string;
  items: string[];
};

export const services: Service[] = [
  {
    part: 'engine',
    name: 'Servis rutin',
    items: ['Ganti oli mesin', 'Cek & setel rem', 'Setel rantai', 'Bersihkan busi & filter udara'],
  },
  {
    part: 'cvt',
    name: 'Servis CVT matic',
    items: ['Bersihkan ruang CVT', 'Ganti V-belt', 'Ganti roller & kampas ganda', 'Oli gardan'],
  },
  {
    part: 'wheels',
    name: 'Ban & velg',
    items: ['Pasang ban luar & dalam', 'Tambal tubeless', 'Pasang velg racing', 'Ganti bearing roda'],
  },
  {
    part: 'suspension',
    name: 'Suspensi',
    items: ['Ganti seal & oli shock', 'Pasang shock depan USD', 'Ganti shock belakang'],
  },
  {
    part: 'brakes',
    name: 'Rem',
    items: ['Ganti kampas rem', 'Kuras minyak rem', 'Ganti piringan cakram'],
  },
  {
    part: 'electrical',
    name: 'Kelistrikan',
    items: ['Cek & ganti aki', 'Ganti lampu', 'Cek kiprok & spul'],
  },
];
