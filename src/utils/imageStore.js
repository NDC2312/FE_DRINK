import newWorld from '~/assets/Store/new world.jpg';
import eon from '~/assets/Store/eon-bd.jpg';
import starbucks from '~/assets/Store/Starbucks.jpg';
import hanThuyen from '~/assets/Store/han thuyen.jpg';
import estella from '~/assets/Store/estella.jpg';
import Goldview from '~/assets/Store/gold view.jpg';
import Lakai from '~/assets/Store/lakai.jpg';
import hungphuoc from '~/assets/Store/hung phuoc.jpg';

const locations = [
    {
        title: 'Starbucks Coffee New World',
        address: 'New World Saigon Hotel, 76 Đ. Nguyễn Thị Nghĩa, Ward, Quận 1, Thành phố Hồ Chí Minh',
        phone: '0283 8237 952',
        hour: '6:30 -- 00:00',
        img: newWorld,
        url: 'https://www.google.com/maps/place/76-5+Phạm+Hồng+Thái,+Phường+Bến+Thành,+Quận+1,+Thành+phố+Hồ+Chí+Minh/@10.7811669,106.6812766,14.83z/data=!4m18!1m12!4m11!1m6!1m2!1s0x3174d8426ae10fb1:0xaed0dabcfcafc1be!2zRMSpIEFuLCBCw6xuaCBExrDGoW5n!2m2!1d106.7529514!2d10.9006383!1m3!2m2!1d106.6938939!2d10.7713929!3m4!1s0x31752f3e9cf69009:0x6a1567d318894d2a!8m2!3d10.7712369!4d106.694097?entry=ttu',
    },
    {
        title: 'Starbucks Aeon Bình Dương Canary',
        address: 'TTTM Aeonmall Bình Dương Canary, Số 01 Đại lộ Bình Dương, Thành phố,Tỉnh Bình Dương 820000',
        phone: '0274 3726 968',
        hour: '7:00 - 22:00',
        img: eon,
        url: 'https://www.google.com/maps/dir/10.905761,106.7588497/Starbucks+Aeon+Bình+Dương+Canary,+TTTM+Aeonmall+Bình+Dương+Canary,+Số+01+Đại+lộ+Bình+Dương,+Thành+phố,+Bình+Dương+820000/@10.9166874,106.7146159,14z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3174d73f1a36747b:0xb9c8ca7340025de1!2m2!1d106.7114989!2d10.9324799?entry=ttu',
    },
    {
        title: 'Starbucks',
        address: '21 Đ. Thảo Điền, Thảo Điền, Quận 2, Thành phố Hồ Chí Minh 70000',
        phone: '028 3744 2040',
        hour: '6:30 - 22:00',
        img: starbucks,
        url: 'https://www.google.com/maps/dir//21+Đ.+Thảo+Điền,+Thảo+Điền,+Quận+2,+Thành+phố+Hồ+Chí+Minh+70000/@10.8032916,106.6963736,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x31752610d3cb2a9b:0x561c8d4b17526298!2m2!1d106.7376496!2d10.8032054?entry=ttu',
    },
    {
        title: 'Starbucks Reserve Hàn Thuyên',
        address: '13 Đ. Hàn Thuyên, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh',
        phone: '028 3823 9237',
        hour: '7:00 - 22:00',
        img: hanThuyen,
        url: 'https://www.google.com/maps/dir//13+Đ.+Hàn+Thuyên,+Bến+Nghé,+Quận+1,+Thành+phố+Hồ+Chí+Minh+700000/@10.7789696,106.6569938,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x31752f378cd95157:0xcf050b32b85275de!2m2!1d106.698257!2d10.7789219?entry=ttu',
    },
    {
        title: 'Starbucks Estella',
        address: ' 88 Song Hành, An Phú, Quận 2, Thành phố Hồ Chí Minh 700000',
        phone: ' 028 3636 7424',
        hour: '7:00 - 22:00',
        img: estella,
        url: 'https://www.google.com/maps/dir/10.905761,106.7588497/Starbucks+Estella,+88+Song+Hành,+An+Phú,+Quận+2,+Thành+phố+Hồ+Chí+Minh+700000/@10.8548831,106.7219082,13z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x317527b17236677d:0x2fabcd91966b2d5a!2m2!1d106.7486724!2d10.8018817?entry=ttu',
    },
    {
        title: 'Starbucks - the Goldview',
        address: '346 Đ. Bến Vân Đồn, Phường 1, Quận 4, Thành phố Hồ Chí Minh 700000',
        phone: '028 3636 3046',
        hour: '7:00 - 22:00',
        img: Goldview,
        url: 'https://www.google.com/maps/dir//346+Đ.+Bến+Vân+Đồn,+Phường+1,+Quận+4,+Thành+phố+Hồ+Chí+Minh+700000/@10.7567993,106.6094267,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x31752f99964db0f3:0xdc05d7a675fa10d5!2m2!1d106.6918286!2d10.7568102?entry=ttu',
    },
    {
        title: 'Starbucks - Lakai',
        address: ' Chung cư Lakai, 98-126 Đ. Nguyễn Tri Phương, Phường 7, Quận 5, Thành phố Hồ Chí Minh',
        phone: '028 3924 1251',
        hour: '7:00 - 22:00',
        img: Lakai,
        url: 'https://www.google.com/maps/dir//Chung+cư+Lakai,+98-126+Đ.+Nguyễn+Tri+Phương,+Phường+7,+Quận+5,+Thành+phố+Hồ+Chí+Minh/@10.7539281,106.6283759,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x31752efbf1ed9b53:0x2ea83a0ebb98729!2m2!1d106.6696617!2d10.7538465?entry=ttu',
    },
    {
        title: 'Starbucks Hưng Phước',
        address: '45-47 Đường Nội Khu Hưng Phước, II, Tân Phong, Quận 7, Thành phố Hồ Chí Minh 700000',
        phone: ' 028 5410 9723',
        hour: '7:00 - 22:00',
        img: hungphuoc,
        url: 'https://www.google.com/maps/dir//45-47+Đường+Nội+Khu+Hưng+Phước,+II,+Tân+Phong,+Quận+7,+Thành+phố+Hồ+Chí+Minh+700000/@10.7314572,106.6655182,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x31752f41e60de7ef:0x277b3932c482e86b!2m2!1d106.7068039!2d10.7313756?entry=ttu',
    },
    // {
    //     title: '',
    //     address: '',
    //     phone: '',
    //     hour: '',
    //     img: '',
    //     url: '',
    // },
];

export { locations };
