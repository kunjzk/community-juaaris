-- Bet data seed for Community Juaaris
-- Generated on 2025-04-06

DO $$
DECLARE
    -- Match UUIDs from 002_match_data.sql
    match_1_id UUID := 'fec43c72-9ad4-4938-8191-d4eb843a5bf5'; -- KKR vs RCB
    match_2_id UUID := '0167a147-70bb-4f4c-9cc8-0a62b354d96d'; -- SRH vs RR
    match_3_id UUID := '9a00522b-c485-439e-b54d-64893f6304a7'; -- CSK vs MI
    match_4_id UUID := '27dbe00f-8c65-4a10-9077-6976f6389444'; -- DC vs LSG
    match_5_id UUID := '1a4c2a67-d8b9-4907-a6ff-e1845abdcdc0'; -- GT vs PBKS
    match_6_id UUID := '580c5c36-ea8c-430c-8a07-55af92ce25b6'; -- RR vs KKR
    match_7_id UUID := '40751ab6-5f44-4964-affe-c85d54a4c09e'; -- SRH vs LSG
    match_8_id UUID := '54f13b92-1038-432d-8615-a5ca3c41b7f1'; -- CSK vs RCB
    match_9_id UUID := 'ba207c15-2686-49ee-a6a9-a881459dbb2f'; -- GT vs MI
    match_10_id UUID := 'f73199c1-dac5-4567-b2d4-957b308dc4b4'; -- DC vs SRH
    match_11_id UUID := '14475ca9-3703-4b1c-844f-41c40ec17b6a'; -- RR vs CSK
    match_12_id UUID := 'e7984264-c380-440a-ba1d-39ccaf44725e'; -- MI vs KKR
    match_13_id UUID := '3f68a480-a4b9-405b-89b7-3b499c10db98'; -- LSG vs PBKS
    match_14_id UUID := '92660fbf-eb0e-41e5-82c1-279427821425'; -- RCB vs GT
    match_15_id UUID := '6fe4c8a5-6ba7-4f12-88b1-35da090ac097'; -- KKR vs SRH
    match_16_id UUID := 'ffc4b933-7fd5-4f30-83c8-2bb814a38db9'; -- LSG vs MI
    match_17_id UUID := '5d605b58-89cb-438a-be98-5983e09ed2b5'; -- CSK vs DC
    match_18_id UUID := 'e615777a-df84-408d-9d71-ee08a4987933'; -- PBKS vs RR

    -- Juaari UUIDs from seed_uuids.txt
    madan_id UUID := 'ff2c177f-7ed9-42a1-8180-2cef8f0c072f';
    anshu_id UUID := 'b3d480e4-f868-4c7f-bc3d-3db38c62a38a';
    pratibha_id UUID := 'ccfb2098-6fde-405f-ba80-2b153bab89ef';
    reena_id UUID := 'be08b4a2-b430-48c7-b56a-cb34b71eaae1';
    suresh_id UUID := '9f40dba6-7f53-4f4c-a1d5-54aad2ae9058';
    pamela_id UUID := '3a281f9b-1b23-4a3f-ac3a-887571c96612';
    sanjeev_id UUID := '24dfbdaa-8839-4692-bec5-ba213062c9e9';
    archit_id UUID := '97695455-d3ab-49ae-9feb-f385117e360a';
    slaks_id UUID := '80a2604a-399f-48e3-a22b-989b035dee02';
    sanjana_id UUID := '0d7f55eb-c101-4366-b01c-12c78dd0dc42';
    rajiv_id UUID := '278e27c7-c1d0-47eb-a17e-206dfae0ab54';
    nidhi_id UUID := '091e4931-51e7-4e2f-9277-30f34ebf006e';
    prachi_id UUID := 'f5f3efe6-36ee-4d5b-81e7-0e380b1e4785';
    kunal_id UUID := '22366429-c4ff-4cec-bd43-2e3c6dc6d676';

    -- Team UUIDs from seed_uuids.txt
    kkr_id UUID := '0e15ecb5-26b7-4a23-9103-500f4f88b365';
    rcb_id UUID := '9198b9ed-3cfd-41ad-b4fa-dffd5ea9219a';
    srh_id UUID := '6c4d7ebd-a3b7-4614-8ace-4a4b9cc4df53';
    rr_id UUID := '8d96a373-57e9-4b39-a81f-9b2bd9a33134';
    csk_id UUID := 'ea73347a-a243-4e3f-829c-06ba382ded12';
    mi_id UUID := '05ccf6c4-c7bb-486b-9487-28fd17d2dedd';
    dc_id UUID := '023f3967-cdc8-409a-ae44-0e98a4381b37';
    lsg_id UUID := '09e0b78b-5f75-479e-9f6c-501bac6e726a';
    gt_id UUID := 'b1659aec-827c-4c99-b58e-52aa4ebb25b8';
    pbks_id UUID := '56b2b5c3-6666-4c02-b436-2d8934f294dd';

    -- Bet UUIDs
    bet_1_1_id UUID := '81a1bae0-3573-4307-9fd2-85586f7c27f7';  -- Match 1, Madan
    bet_1_2_id UUID := '19ea61d5-4404-4e93-83cc-48020754a8ea';  -- Match 1, Anshu
    bet_1_3_id UUID := '4a16c023-9581-406f-831a-f27b7a0cda5f';  -- Match 1, Pratibha
    bet_1_4_id UUID := '76568870-5fce-47e9-b1da-ba55462bc596';  -- Match 1, Reena
    bet_1_5_id UUID := '0eaddae5-8f30-4a34-97bc-647e162b6168';  -- Match 1, Suresh
    bet_1_6_id UUID := '9963d65a-2c89-4603-8685-0e5a97ee1b65';  -- Match 1, Pamela
    bet_1_7_id UUID := '1cdc20d5-ba3a-4bee-a233-1a2da10ab230';  -- Match 1, Sanjeev
    bet_1_8_id UUID := 'ccf04d1d-1526-4685-819e-2e0f13c5b384';  -- Match 1, Archit
    bet_1_9_id UUID := 'ffd5be07-dcc3-479a-b26e-82bd909488d3';  -- Match 1, S.Laks
    bet_1_10_id UUID := 'bc98692f-820d-4cec-9696-446e9342fe05';  -- Match 1, Sanjana
    bet_1_11_id UUID := 'f1977a68-52fd-4b9f-92be-e03a27fc66f3';  -- Match 1, Rajiv
    bet_1_12_id UUID := '9cc465cd-f213-49ab-afcc-e90427c9b377';  -- Match 1, Nidhi
    bet_1_13_id UUID := '77e6d912-bc4d-4511-8e49-02f8fd95220d';  -- Match 1, Prachi
    bet_1_14_id UUID := '534fe8a9-f9f9-4333-affd-bc16492e36b7';  -- Match 1, Kunal
    bet_2_15_id UUID := 'bb9988af-6297-49c0-9638-92e60eec2495';  -- Match 2, Madan
    bet_2_16_id UUID := '15e91018-582f-435d-a265-2783b5c319d3';  -- Match 2, Anshu
    bet_2_17_id UUID := 'e2b90099-3b2c-47b6-9f8d-95d9d8fb8898';  -- Match 2, Pratibha
    bet_2_18_id UUID := '2b81e6a0-189b-4734-a076-e3ffddb41f24';  -- Match 2, Reena
    bet_2_19_id UUID := '7386934b-e3e6-48dc-8f87-a89eaf6e93a6';  -- Match 2, Suresh
    bet_2_20_id UUID := '2fc57198-f915-4f3b-a77b-ef3011591648';  -- Match 2, Pamela
    bet_2_21_id UUID := '61a1b4df-347e-4c31-afea-d11fa01c5d77';  -- Match 2, Sanjeev
    bet_2_22_id UUID := 'e1341430-4bb4-42b1-8ce4-728d31a5eb3f';  -- Match 2, Archit
    bet_2_23_id UUID := 'd354af81-c37c-4b96-a56f-846711d701e7';  -- Match 2, S.Laks
    bet_2_24_id UUID := 'e51e91e1-7554-44cc-8b72-08f5741b44ec';  -- Match 2, Sanjana
    bet_2_25_id UUID := 'f8007dd9-6077-4359-8899-14a319bea0f5';  -- Match 2, Rajiv
    bet_2_26_id UUID := '9ce1d700-a090-401c-9c3c-70a7b81fb4a7';  -- Match 2, Nidhi
    bet_2_27_id UUID := '64c99170-0acd-4250-8ec5-73dce64295fe';  -- Match 2, Prachi
    bet_2_28_id UUID := '150f2e9e-06d7-40f3-bc1d-1ca03a8fc066';  -- Match 2, Kunal
    bet_3_29_id UUID := '1e22f1cf-39ef-4859-b1f6-a5a226883c4e';  -- Match 3, Madan
    bet_3_30_id UUID := 'e9917fe8-77f4-4d96-9f1d-aa3d5902c718';  -- Match 3, Anshu
    bet_3_31_id UUID := 'f8e54980-8f4a-4d8a-b767-2b2888ba41aa';  -- Match 3, Pratibha
    bet_3_32_id UUID := '58f5942e-c8cb-45bf-bba8-3277d0f51297';  -- Match 3, Reena
    bet_3_33_id UUID := 'de1959bc-4b40-4c20-bfe5-95108425a8be';  -- Match 3, Suresh
    bet_3_34_id UUID := 'a50a20ed-bf28-4e65-802e-b3a26e81821c';  -- Match 3, Pamela
    bet_3_35_id UUID := '6aa2ca03-5b61-428a-aa7f-29fb9505d2eb';  -- Match 3, Sanjeev
    bet_3_36_id UUID := '641ddba7-c81b-4a43-8c94-be0a64e4b227';  -- Match 3, Archit
    bet_3_37_id UUID := 'cadf19a2-f3f9-4211-8d61-8a992ec9d407';  -- Match 3, S.Laks
    bet_3_38_id UUID := 'a91b68e3-c007-42a5-a7fa-00e2dce5dba3';  -- Match 3, Sanjana
    bet_3_39_id UUID := 'c40607ee-4eb6-4cae-946d-579534a27196';  -- Match 3, Rajiv
    bet_3_40_id UUID := '3cce43e6-2ed9-4361-9382-8c679782e224';  -- Match 3, Nidhi
    bet_3_41_id UUID := '4b4b07fc-6556-4c1e-9b4b-e426a993e2ff';  -- Match 3, Prachi
    bet_3_42_id UUID := '5ab0d5f8-3d95-40d0-887a-233c29c85e7e';  -- Match 3, Kunal
    bet_4_43_id UUID := 'd096f1cc-0b2d-43cb-a6f4-ed50048ab8de';  -- Match 4, Madan
    bet_4_44_id UUID := '229704b6-57e8-494f-ab32-3894c40c0e68';  -- Match 4, Anshu
    bet_4_45_id UUID := '9a145542-c3ac-435e-b562-c7063219f79b';  -- Match 4, Pratibha
    bet_4_46_id UUID := 'beee0d36-4980-4468-9fd2-b7ac31559302';  -- Match 4, Reena
    bet_4_47_id UUID := '11fa6477-81c5-44ae-aa80-a006ae097068';  -- Match 4, Suresh
    bet_4_48_id UUID := '2321fc8d-7226-4761-88d0-6317206dc003';  -- Match 4, Pamela
    bet_4_49_id UUID := 'ff4d779e-cbfd-46ff-9b0b-4ed754adbc73';  -- Match 4, Sanjeev
    bet_4_50_id UUID := '4fb12cb6-5190-421d-977d-a443384ad691';  -- Match 4, Archit
    bet_4_51_id UUID := '9e917030-fdca-42d9-8de2-ddb838e0e220';  -- Match 4, S.Laks
    bet_4_52_id UUID := 'b1c69138-c752-4517-bf32-954b887d62cc';  -- Match 4, Sanjana
    bet_4_53_id UUID := '6e9a6352-7fb9-4470-b732-11cf7e618b02';  -- Match 4, Rajiv
    bet_4_54_id UUID := 'a36679de-77b8-4336-8e7d-49407d3cc1b2';  -- Match 4, Nidhi
    bet_4_55_id UUID := 'd7591175-74cf-40fc-8109-01f46064cc27';  -- Match 4, Prachi
    bet_4_56_id UUID := 'a63133a4-3d0c-4cdc-8964-333e673abd87';  -- Match 4, Kunal
    bet_5_57_id UUID := 'da6f7945-94f8-404f-8f6a-06460f0a3e39';  -- Match 5, Madan
    bet_5_58_id UUID := '8dce8f61-4cc8-441d-85ec-3340659e4794';  -- Match 5, Anshu
    bet_5_59_id UUID := 'c9426bf8-e957-4c6c-9ad3-92b2b0a29a55';  -- Match 5, Pratibha
    bet_5_60_id UUID := '5d81aedc-3555-4cad-b15d-cffb19fb8f7f';  -- Match 5, Reena
    bet_5_61_id UUID := 'cc809669-0fb8-4ef5-bfae-5a53e6a8ff96';  -- Match 5, Suresh
    bet_5_62_id UUID := 'ecc4fbf2-7d67-4daa-ba6d-a3fec92a5307';  -- Match 5, Pamela
    bet_5_63_id UUID := '35824b0a-f0e3-46c1-9243-000e39937a93';  -- Match 5, Sanjeev
    bet_5_64_id UUID := '48244f9f-b2b8-44bc-a285-ad381b372ab3';  -- Match 5, Archit
    bet_5_65_id UUID := 'ade15dca-8ebb-4ad4-8581-8c3d921ce769';  -- Match 5, S.Laks
    bet_5_66_id UUID := 'b6aae41c-b2e2-4ac7-8309-040ad74a6681';  -- Match 5, Sanjana
    bet_5_67_id UUID := 'ac386b2a-8391-4b5c-bd34-fea09f5efe41';  -- Match 5, Rajiv
    bet_5_68_id UUID := '30495c4c-1de4-4b47-9f11-03e2e5aca74e';  -- Match 5, Nidhi
    bet_5_69_id UUID := '40966b60-2b76-40e9-b6e2-0deb5bb2c236';  -- Match 5, Prachi
    bet_5_70_id UUID := '75a86af0-a867-44ac-a3ce-17aebee6ec0e';  -- Match 5, Kunal
    bet_6_71_id UUID := '30b83987-8519-408f-8f61-c47da170ad71';  -- Match 6, Madan
    bet_6_72_id UUID := '70ef0bf4-1746-4000-be5c-6d9ca4859400';  -- Match 6, Anshu
    bet_6_73_id UUID := 'a7e20efa-7163-441b-a2dc-964cb24020c2';  -- Match 6, Pratibha
    bet_6_74_id UUID := '197ff208-2fe7-4127-bed1-3eff2d4215f8';  -- Match 6, Reena
    bet_6_75_id UUID := '373e638b-6c3b-4937-8df6-7ca69b838007';  -- Match 6, Suresh
    bet_6_76_id UUID := '9edcb26b-5c22-432e-add4-a829756d7230';  -- Match 6, Pamela
    bet_6_77_id UUID := 'abffdf80-bdfe-4e2a-950b-a32a8c98ebed';  -- Match 6, Sanjeev
    bet_6_78_id UUID := '036d17f5-2c9c-40b5-b00d-f5f52072f7d1';  -- Match 6, Archit
    bet_6_79_id UUID := '75dc9356-6d6f-4116-ab71-85f3d4a087f9';  -- Match 6, S.Laks
    bet_6_80_id UUID := 'a83d771f-d15b-46ee-b7a4-2588250e2efa';  -- Match 6, Sanjana
    bet_6_81_id UUID := '6865ca92-16e6-478b-8d4a-b955ced84744';  -- Match 6, Rajiv
    bet_6_82_id UUID := '36b014b3-ce36-4bd5-b053-55c6c85a11bb';  -- Match 6, Nidhi
    bet_6_83_id UUID := '047047e4-382a-4d01-bbf2-a8ae6eef367e';  -- Match 6, Prachi
    bet_6_84_id UUID := 'd66c3975-3f3f-4ea4-b2b4-cf129ab129ce';  -- Match 6, Kunal
    bet_7_85_id UUID := '8df436ba-a415-4216-b3e1-0210701cc643';  -- Match 7, Madan
    bet_7_86_id UUID := '48edc70d-0746-4c39-8ed2-dd651d5d9172';  -- Match 7, Anshu
    bet_7_87_id UUID := 'a83b97c0-be88-4002-b9c2-94d137f92b2b';  -- Match 7, Pratibha
    bet_7_88_id UUID := '0f449f76-950c-4216-a0f0-ba27fadb207d';  -- Match 7, Reena
    bet_7_89_id UUID := 'ab835217-1b36-48e3-bd3a-7b93a6911500';  -- Match 7, Suresh
    bet_7_90_id UUID := 'de470bba-48ba-4f28-a409-d0ce6b441bda';  -- Match 7, Pamela
    bet_7_91_id UUID := '77448250-a88c-4438-bf6f-5fd09e50e489';  -- Match 7, Sanjeev
    bet_7_92_id UUID := 'e380d408-026a-4312-9220-106b6a5b7eee';  -- Match 7, Archit
    bet_7_93_id UUID := 'f172624a-a474-492a-8563-6a620327fcc1';  -- Match 7, S.Laks
    bet_7_94_id UUID := 'a99a0a8f-ed21-4f77-af47-ba04aee16cbd';  -- Match 7, Sanjana
    bet_7_95_id UUID := 'ca46986f-d1a0-4463-963a-2ac99d86876e';  -- Match 7, Rajiv
    bet_7_96_id UUID := '1b6fb33f-740c-4ce8-a944-ded3fcc77857';  -- Match 7, Nidhi
    bet_7_97_id UUID := '7eb2770b-556f-4947-95d2-3071dfa3661c';  -- Match 7, Prachi
    bet_7_98_id UUID := 'c150b74c-412f-42e6-92df-7a61fb1e11e8';  -- Match 7, Kunal
    bet_8_99_id UUID := '2063dbb0-7e48-41f6-81d7-2c2ea9382166';  -- Match 8, Madan
    bet_8_100_id UUID := 'adcbfe72-c92d-41c4-8e0e-597ba623e57e';  -- Match 8, Anshu
    bet_8_101_id UUID := 'b270a2d5-c34c-4100-a2b9-a16acc557ccf';  -- Match 8, Pratibha
    bet_8_102_id UUID := '9a768059-7f08-4a66-b18d-e3566910ab99';  -- Match 8, Reena
    bet_8_103_id UUID := '34785ddd-297f-4dd9-a489-a4a9450f6855';  -- Match 8, Suresh
    bet_8_104_id UUID := 'f091cbec-60be-4e4b-95df-d3d07d8a49af';  -- Match 8, Pamela
    bet_8_105_id UUID := 'c2394425-5b7a-4424-816f-ae9567231d1a';  -- Match 8, Sanjeev
    bet_8_106_id UUID := '1c77f0a4-d1ec-4491-a5ab-60a9a16a9612';  -- Match 8, Archit
    bet_8_107_id UUID := '1395c514-9ff9-47f3-bacf-e4b4c3fcc818';  -- Match 8, S.Laks
    bet_8_108_id UUID := '154e949d-9210-4181-90cc-052fdf7d3fbf';  -- Match 8, Sanjana
    bet_8_109_id UUID := 'fe5df26c-bdbe-4064-9325-0f5234ae337a';  -- Match 8, Rajiv
    bet_8_110_id UUID := '2120b22f-0427-4d48-b8ea-e32350eb3252';  -- Match 8, Nidhi
    bet_8_111_id UUID := '22a35aea-ec0b-4003-8d6a-d389b9d037b4';  -- Match 8, Prachi
    bet_8_112_id UUID := 'db025996-4bba-46be-8c0f-5777ff4b9f34';  -- Match 8, Kunal
    bet_9_113_id UUID := 'ae5457b5-b094-4a63-bacc-197e9ac55c2b';  -- Match 9, Madan
    bet_9_114_id UUID := '0c502bcc-bfcb-4277-af24-7dd762ce6312';  -- Match 9, Anshu
    bet_9_115_id UUID := '404f5e62-a9d4-4273-8e6b-5e23afbd2f71';  -- Match 9, Pratibha
    bet_9_116_id UUID := '52192c3c-781f-4765-951e-4b7d4c6dafae';  -- Match 9, Reena
    bet_9_117_id UUID := '96082372-9574-4173-bf83-481a8c77339e';  -- Match 9, Suresh
    bet_9_118_id UUID := '6859af1a-e76e-4420-8ade-8340d260e055';  -- Match 9, Pamela
    bet_9_119_id UUID := '66f3f8a4-f455-4bdf-b840-22affdd2bdc9';  -- Match 9, Sanjeev
    bet_9_120_id UUID := 'd6337625-92e8-4319-aa54-6802329eebde';  -- Match 9, Archit
    bet_9_121_id UUID := '7a1b2808-7c34-4f8b-bbd5-edbdd67211fe';  -- Match 9, S.Laks
    bet_9_122_id UUID := '053826c0-96f6-49f6-9231-4fa1adf89a12';  -- Match 9, Sanjana
    bet_9_123_id UUID := 'eb1eb0fd-ec90-4088-8274-897974182902';  -- Match 9, Rajiv
    bet_9_124_id UUID := '9f00c8c4-5820-47e0-a065-e90df19e4923';  -- Match 9, Nidhi
    bet_9_125_id UUID := '3efad341-c33e-4f38-84b6-c1cd105441e9';  -- Match 9, Prachi
    bet_9_126_id UUID := 'b190b520-e12f-4ffb-9db8-339c1f686890';  -- Match 9, Kunal
    bet_10_127_id UUID := '190c8f84-0c48-415d-9c04-923b04a4a0d8';  -- Match 10, Madan
    bet_10_128_id UUID := 'af0cdcf0-91d3-4559-b748-038e02a1a338';  -- Match 10, Anshu
    bet_10_129_id UUID := '195eb426-dcd9-4cd8-ab71-9b6a747e9d9b';  -- Match 10, Pratibha
    bet_10_130_id UUID := 'c0e60894-7327-46ca-8ad3-2c6855ced38b';  -- Match 10, Reena
    bet_10_131_id UUID := 'f46774d4-f670-442b-b594-50d1dcffd625';  -- Match 10, Suresh
    bet_10_132_id UUID := '06a5450a-5fac-47f2-9617-f7ce79cdb7bd';  -- Match 10, Pamela
    bet_10_133_id UUID := 'dc7e9db2-e496-4450-99ce-74b75cfa9c63';  -- Match 10, Sanjeev
    bet_10_134_id UUID := '95d7ae97-a5a7-47d4-a6e8-b0f17965477d';  -- Match 10, Archit
    bet_10_135_id UUID := '425dd183-2575-46f8-9b15-8c24620d0b6c';  -- Match 10, S.Laks
    bet_10_136_id UUID := '666a44a1-4fc4-47be-bd72-62095a6aa6ec';  -- Match 10, Sanjana
    bet_10_137_id UUID := '7887092f-bdfb-48fc-8951-c65fe4fad64a';  -- Match 10, Rajiv
    bet_10_138_id UUID := '6673e1b8-0b84-4098-954c-997c5bec2685';  -- Match 10, Nidhi
    bet_10_139_id UUID := '4e92e4de-99bb-44dd-a5bf-e8e51feea322';  -- Match 10, Prachi
    bet_10_140_id UUID := '9c2be948-93b8-413c-a5f3-7694e1b2c250';  -- Match 10, Kunal
    bet_11_141_id UUID := 'a2791be2-4aa9-4ad7-a637-fcbc87b29891';  -- Match 11, Madan
    bet_11_142_id UUID := '0d3f8cba-7703-42c6-9143-4c7479a5b566';  -- Match 11, Anshu
    bet_11_143_id UUID := '4ed97d2b-d47b-4fad-b558-1695e77b618d';  -- Match 11, Pratibha
    bet_11_144_id UUID := 'c0fe6c91-0029-49a6-b1ad-0316d2714990';  -- Match 11, Reena
    bet_11_145_id UUID := '5feffe2e-0518-4267-a96e-d486a9619e72';  -- Match 11, Suresh
    bet_11_146_id UUID := '83b7440c-3a77-4c51-b82b-fdac75276921';  -- Match 11, Pamela
    bet_11_147_id UUID := '95a451c4-4add-49dc-82f7-1e2115f2a8e6';  -- Match 11, Sanjeev
    bet_11_148_id UUID := 'bd963a55-5a7f-4fdd-b47f-5d253b3d0889';  -- Match 11, Archit
    bet_11_149_id UUID := '68d06a3b-f7fc-452d-9ccb-65d18320458b';  -- Match 11, S.Laks
    bet_11_150_id UUID := '5e6b3a75-cb7f-4e56-8b78-29f547a2006a';  -- Match 11, Sanjana
    bet_11_151_id UUID := '663113f3-3b53-44ab-ac82-f4b9622c65a7';  -- Match 11, Rajiv
    bet_11_152_id UUID := '40b66143-1ea9-49bb-9f30-db6eac04bb9f';  -- Match 11, Nidhi
    bet_11_153_id UUID := '9742fe4d-ef35-40ac-b0fb-d86f28e795e4';  -- Match 11, Prachi
    bet_11_154_id UUID := '9145384e-3a08-45a8-b229-0051a6a7b301';  -- Match 11, Kunal
    bet_12_155_id UUID := 'e59517fc-3985-4a8d-9810-5154d8128c49';  -- Match 12, Madan
    bet_12_156_id UUID := 'ea49e275-d43e-4216-8976-22b2f6c0cc6f';  -- Match 12, Anshu
    bet_12_157_id UUID := '1a4dc989-17df-4c6e-bbfa-cf3480112de1';  -- Match 12, Pratibha
    bet_12_158_id UUID := 'feeafd45-9504-4d0d-80f1-9dd360452a0a';  -- Match 12, Reena
    bet_12_159_id UUID := '85cbcb50-f60f-4d48-b3ec-4425035c278f';  -- Match 12, Suresh
    bet_12_160_id UUID := 'd176883f-f1f3-4283-a9dd-19bb9c335969';  -- Match 12, Pamela
    bet_12_161_id UUID := '99530fc3-ad1b-48b6-b728-b292949b488d';  -- Match 12, Sanjeev
    bet_12_162_id UUID := '5490dfb9-d15a-412d-bde4-1a3484d5a105';  -- Match 12, Archit
    bet_12_163_id UUID := 'a7b7f12b-58f6-48cf-b5ef-2f35f1f86a27';  -- Match 12, S.Laks
    bet_12_164_id UUID := 'd2056c0a-caaa-41e1-9738-4390bd308d44';  -- Match 12, Sanjana
    bet_12_165_id UUID := '2b100a8b-6293-4b85-af56-9705a594428a';  -- Match 12, Rajiv
    bet_12_166_id UUID := 'f5fd7cc3-14f8-417c-83a1-a6f4a5b68a08';  -- Match 12, Nidhi
    bet_12_167_id UUID := 'fcc38c34-eb1c-4374-8c65-58b9c3a4614e';  -- Match 12, Prachi
    bet_12_168_id UUID := '1bc4ef5c-a3d7-4762-abce-7620eb2c3f89';  -- Match 12, Kunal
    bet_13_169_id UUID := '9a623458-f7ec-40ec-9670-f0426a76c533';  -- Match 13, Madan
    bet_13_170_id UUID := '41abd552-c9cd-4bdc-854d-3a7036906a17';  -- Match 13, Anshu
    bet_13_171_id UUID := 'dc1d70f9-a86c-4e92-8efd-66ede731086b';  -- Match 13, Pratibha
    bet_13_172_id UUID := '7ef91a5c-fab9-499b-9881-3ca64885292a';  -- Match 13, Reena
    bet_13_173_id UUID := '43924054-bbe7-441f-b671-4917eb21f01d';  -- Match 13, Suresh
    bet_13_174_id UUID := 'f9f06d52-4083-4da6-a634-252fbb92a808';  -- Match 13, Pamela
    bet_13_175_id UUID := '0fc7c58c-10e3-4b94-98ea-5954567f71d4';  -- Match 13, Sanjeev
    bet_13_176_id UUID := 'a5dbb3fd-f376-4860-b5e1-469c607b88da';  -- Match 13, Archit
    bet_13_177_id UUID := '90c74923-1e2a-476c-bcd5-0b4a7a248227';  -- Match 13, S.Laks
    bet_13_178_id UUID := '3e5ccff2-5645-4a7f-b18a-92d0332f8e61';  -- Match 13, Sanjana
    bet_13_179_id UUID := 'ff9a3458-1ed7-4135-981e-2c1b0277d13d';  -- Match 13, Rajiv
    bet_13_180_id UUID := '64e108e9-570b-4067-ae61-062db6299218';  -- Match 13, Nidhi
    bet_13_181_id UUID := '7ddaac9f-c17b-4dd0-acad-2edc6c179384';  -- Match 13, Prachi
    bet_13_182_id UUID := '770f5108-8d51-4314-9e56-82b752727ee0';  -- Match 13, Kunal
    bet_14_183_id UUID := 'cc8b7b9d-759c-40e2-b741-4a842df05ddf';  -- Match 14, Madan
    bet_14_184_id UUID := '46b17442-7a2f-4e1d-a64d-0b25488a12ab';  -- Match 14, Anshu
    bet_14_185_id UUID := 'a26b5ba1-71ef-43c4-8dcc-30d437f01875';  -- Match 14, Pratibha
    bet_14_186_id UUID := 'ee694da2-96a2-4115-be67-05bdfb7a5ca8';  -- Match 14, Reena
    bet_14_187_id UUID := '787a668d-647d-40d7-98ac-026cbb85bf3e';  -- Match 14, Suresh
    bet_14_188_id UUID := 'cbc4ae7f-a418-4500-afb6-59caa6b0cdf4';  -- Match 14, Pamela
    bet_14_189_id UUID := '79449bb8-37c8-45e4-95b3-c9751332154d';  -- Match 14, Sanjeev
    bet_14_190_id UUID := '0cf696a6-90ac-4b0d-9525-1b3f33ab902c';  -- Match 14, Archit
    bet_14_191_id UUID := 'cf4a47fc-8b11-4509-bf1c-7bf6ee7af370';  -- Match 14, S.Laks
    bet_14_192_id UUID := '779b1804-751a-4aa3-83ed-9c4554d9eef7';  -- Match 14, Sanjana
    bet_14_193_id UUID := 'cf7f13a7-31be-440d-86b4-cf6cb72f09db';  -- Match 14, Rajiv
    bet_14_194_id UUID := 'a278997f-325b-4e96-94b3-5986f2dd6a9a';  -- Match 14, Nidhi
    bet_14_195_id UUID := 'feaa48f5-64f8-40e4-a65e-201019c6e6aa';  -- Match 14, Prachi
    bet_14_196_id UUID := 'c8f9e671-873e-4495-8113-cf13943742dd';  -- Match 14, Kunal
    bet_15_197_id UUID := 'e3ca9cb2-59bb-4cb5-aac9-42b238d82813';  -- Match 15, Madan
    bet_15_198_id UUID := 'cc5f2cfd-fb2c-4b3e-ada3-0c5927966470';  -- Match 15, Anshu
    bet_15_199_id UUID := 'f1c6b98d-0bf1-47cd-84b8-0a034d4aa95f';  -- Match 15, Pratibha
    bet_15_200_id UUID := 'd25d3c5f-ac4b-4955-aba5-dfddc0088a03';  -- Match 15, Reena
    bet_15_201_id UUID := '2075a029-a6e2-4641-80ef-2fef1cd4df6a';  -- Match 15, Suresh
    bet_15_202_id UUID := '295b9b41-cafd-44a1-8db4-9fb18b8c1405';  -- Match 15, Pamela
    bet_15_203_id UUID := '714c8fab-070b-41ec-b6fd-ced8bf9ea6e8';  -- Match 15, Sanjeev
    bet_15_204_id UUID := 'f7900f53-e0ae-4b1d-bcb8-7f04f2b76c3f';  -- Match 15, Archit
    bet_15_205_id UUID := 'e9491dd3-9447-4ffb-83b3-976e1756dddf';  -- Match 15, S.Laks
    bet_15_206_id UUID := 'f48a42e2-131e-4832-84ba-33c3cd2ad75e';  -- Match 15, Sanjana
    bet_15_207_id UUID := '6bbc6903-d3f2-49b7-8391-cb774c170b88';  -- Match 15, Rajiv
    bet_15_208_id UUID := '1a05df0a-ec00-4749-b9b2-cdb980b5f1ad';  -- Match 15, Nidhi
    bet_15_209_id UUID := 'adfb7afb-c7cf-4923-9958-d64e4f4a4134';  -- Match 15, Prachi
    bet_15_210_id UUID := 'df66cf8d-90a8-4983-806e-54718b1e8042';  -- Match 15, Kunal
    bet_16_211_id UUID := '2065b27e-7ae0-458f-abac-e7708eab1453';  -- Match 16, Madan
    bet_16_212_id UUID := '00c21467-b39b-4209-823a-5a4408613d6c';  -- Match 16, Anshu
    bet_16_213_id UUID := 'b636c16f-d6af-4f3f-8813-b212e724cc29';  -- Match 16, Pratibha
    bet_16_214_id UUID := 'fc3c1de0-b7d4-43ba-b19e-1e9225a6bb9b';  -- Match 16, Reena
    bet_16_215_id UUID := '2cdcd100-8e94-4766-b5a6-0de129b748f0';  -- Match 16, Suresh
    bet_16_216_id UUID := 'f656c7cd-dfd5-4ec2-a61d-2829cd9259a2';  -- Match 16, Pamela
    bet_16_217_id UUID := '30a9897c-5934-4a7b-876f-c21cb0fc5b0c';  -- Match 16, Sanjeev
    bet_16_218_id UUID := '83f0af4c-12d4-4828-b6c4-811a513b1fcd';  -- Match 16, Archit
    bet_16_219_id UUID := '68ca6b4e-bdd7-467d-b0fd-86b8a925a2fc';  -- Match 16, S.Laks
    bet_16_220_id UUID := '7e624e33-f6f1-438c-8ca9-eb42bb89ead1';  -- Match 16, Sanjana
    bet_16_221_id UUID := 'ab429f99-54c5-4738-b515-54dbdfd1cc1d';  -- Match 16, Rajiv
    bet_16_222_id UUID := 'df362a44-52bd-4c85-8c59-7ea7c354e2d3';  -- Match 16, Nidhi
    bet_16_223_id UUID := '508c1eef-205b-4bf7-89f9-7a74c84517a8';  -- Match 16, Prachi
    bet_16_224_id UUID := 'e48daec6-b6fc-4556-9681-fbf67df15688';  -- Match 16, Kunal
    bet_17_225_id UUID := 'e575dfde-fd4e-432e-a8cb-42ebd10e64df';  -- Match 17, Madan
    bet_17_226_id UUID := '0059e59b-61f5-48eb-a14c-dd95a5bcecde';  -- Match 17, Anshu
    bet_17_227_id UUID := '104c7c94-be7e-40c9-a647-ee8528868616';  -- Match 17, Pratibha
    bet_17_228_id UUID := '79f0ea2c-ff32-4b56-bee9-b59f7050f309';  -- Match 17, Reena
    bet_17_229_id UUID := 'a4057f8c-6e93-40fc-861b-f76e241122a6';  -- Match 17, Suresh
    bet_17_230_id UUID := '5a26b787-b986-4620-a783-fb6431cb67fd';  -- Match 17, Pamela
    bet_17_231_id UUID := 'c041a2d3-9c04-4162-a110-46d2fa5f4086';  -- Match 17, Sanjeev
    bet_17_232_id UUID := 'bc30ac99-f590-4694-9ebd-3680bc48d3d4';  -- Match 17, Archit
    bet_17_233_id UUID := 'ee5f1392-92ea-46a7-bab1-e03ff2a251bb';  -- Match 17, S.Laks
    bet_17_234_id UUID := 'b8b322a0-fbec-4487-a258-18e37837fee1';  -- Match 17, Sanjana
    bet_17_235_id UUID := '170ebb11-c8c2-489c-abd9-13bc053caaf3';  -- Match 17, Rajiv
    bet_17_236_id UUID := '6c4270df-24b2-42d7-bd88-b07a68e5fe39';  -- Match 17, Nidhi
    bet_17_237_id UUID := '5ec31c8d-9b88-4331-9b46-83f44a528652';  -- Match 17, Prachi
    bet_17_238_id UUID := '97e44c64-777e-4bfc-95cb-00beb9847cf7';  -- Match 17, Kunal
    bet_18_239_id UUID := 'd85f6cc7-522c-40b1-8f13-aca877d69c8b';  -- Match 18, Madan
    bet_18_240_id UUID := '40ef7366-d02b-46d7-b161-8f8d1b3b4291';  -- Match 18, Anshu
    bet_18_241_id UUID := '70ef2859-218a-43e7-a525-8f991ba742cf';  -- Match 18, Pratibha
    bet_18_242_id UUID := '47e55940-cfd2-43bd-80c5-aa85d615e5fd';  -- Match 18, Reena
    bet_18_243_id UUID := '5239a691-82cd-4aa2-bf4b-05f2554d140c';  -- Match 18, Suresh
    bet_18_244_id UUID := 'ab3bd382-f12a-497f-904c-318fed694984';  -- Match 18, Pamela
    bet_18_245_id UUID := '616cce84-bc8f-40ba-b8b0-14cfc6d4ce71';  -- Match 18, Sanjeev
    bet_18_246_id UUID := 'c0cbe7f1-4899-4422-8572-ec2ec5d05d3a';  -- Match 18, Archit
    bet_18_247_id UUID := 'fe2619f8-7e21-4eea-bc0b-17380c19808f';  -- Match 18, S.Laks
    bet_18_248_id UUID := '08516f84-7f35-4c86-8d49-e9a43358f8c5';  -- Match 18, Sanjana
    bet_18_249_id UUID := '7556a7aa-7fb9-4c4e-a141-344e047791f8';  -- Match 18, Rajiv
    bet_18_250_id UUID := 'e8679192-0a52-472d-a88a-405fbe25662b';  -- Match 18, Nidhi
    bet_18_251_id UUID := 'b6930338-aa3e-42c6-8d41-8f9039e2d46f';  -- Match 18, Prachi
    bet_18_252_id UUID := '02ee6e78-7abe-4b3c-9840-1bf05bc29b20';  -- Match 18, Kunal

BEGIN
    
    INSERT INTO bets (id, match_id, juaari_id, predicted_winning_team, predicted_more_or_less, bet_amount, successful) VALUES
    (bet_1_1_id, match_1_id, madan_id, rcb_id, 'LESS', 5, FALSE),
    (bet_1_2_id, match_1_id, anshu_id, kkr_id, 'MORE', 5, FALSE),
    (bet_1_3_id, match_1_id, pratibha_id, rcb_id, 'MORE', 5, TRUE),
    (bet_1_4_id, match_1_id, reena_id, kkr_id, 'LESS', 5, FALSE),
    (bet_1_5_id, match_1_id, suresh_id, kkr_id, 'MORE', 5, FALSE),
    (bet_1_6_id, match_1_id, pamela_id, kkr_id, 'MORE', 5, FALSE),
    (bet_1_7_id, match_1_id, sanjeev_id, kkr_id, 'LESS', 5, FALSE),
    (bet_1_8_id, match_1_id, archit_id, kkr_id, 'LESS', 5, FALSE),
    (bet_1_9_id, match_1_id, slaks_id, rcb_id, 'MORE', 5, TRUE),
    (bet_1_10_id, match_1_id, sanjana_id, kkr_id, 'LESS', 5, FALSE),
    (bet_1_11_id, match_1_id, rajiv_id, rcb_id, 'MORE', 5, TRUE),
    (bet_1_12_id, match_1_id, nidhi_id, kkr_id, 'LESS', 5, FALSE),
    (bet_1_13_id, match_1_id, prachi_id, kkr_id, 'LESS', 5, FALSE),
    (bet_1_14_id, match_1_id, kunal_id, kkr_id, 'LESS', 5, FALSE),
    (bet_2_15_id, match_2_id, madan_id, rr_id, 'MORE', 5, FALSE),
    (bet_2_16_id, match_2_id, anshu_id, srh_id, 'LESS', 5, FALSE),
    (bet_2_17_id, match_2_id, pratibha_id, rr_id, 'LESS', 5, FALSE),
    (bet_2_18_id, match_2_id, reena_id, rr_id, 'MORE', 5, FALSE),
    (bet_2_19_id, match_2_id, suresh_id, srh_id, 'LESS', 5, FALSE),
    (bet_2_20_id, match_2_id, pamela_id, srh_id, 'LESS', 5, FALSE),
    (bet_2_21_id, match_2_id, sanjeev_id, srh_id, 'LESS', 5, FALSE),
    (bet_2_22_id, match_2_id, archit_id, srh_id, 'MORE', 5, TRUE),
    (bet_2_23_id, match_2_id, slaks_id, rr_id, 'LESS', 5, FALSE),
    (bet_2_24_id, match_2_id, sanjana_id, srh_id, 'MORE', 5, TRUE),
    (bet_2_25_id, match_2_id, rajiv_id, srh_id, 'LESS', 5, FALSE),
    (bet_2_26_id, match_2_id, nidhi_id, srh_id, 'MORE', 5, TRUE),
    (bet_2_27_id, match_2_id, prachi_id, srh_id, 'MORE', 5, TRUE),
    (bet_2_28_id, match_2_id, kunal_id, srh_id, 'MORE', 5, TRUE),
    (bet_3_29_id, match_3_id, madan_id, mi_id, 'LESS', 5, FALSE),
    (bet_3_30_id, match_3_id, anshu_id, csk_id, 'MORE', 5, FALSE),
    (bet_3_31_id, match_3_id, pratibha_id, mi_id, 'MORE', 5, FALSE),
    (bet_3_32_id, match_3_id, reena_id, mi_id, 'MORE', 5, FALSE),
    (bet_3_33_id, match_3_id, suresh_id, mi_id, 'LESS', 5, FALSE),
    (bet_3_34_id, match_3_id, pamela_id, mi_id, 'LESS', 5, FALSE),
    (bet_3_35_id, match_3_id, sanjeev_id, csk_id, 'MORE', 5, FALSE),
    (bet_3_36_id, match_3_id, archit_id, csk_id, 'LESS', 5, TRUE),
    (bet_3_37_id, match_3_id, slaks_id, csk_id, 'MORE', 5, FALSE),
    (bet_3_38_id, match_3_id, sanjana_id, csk_id, 'LESS', 5, TRUE),
    (bet_3_39_id, match_3_id, rajiv_id, csk_id, 'LESS', 5, TRUE),
    (bet_3_40_id, match_3_id, nidhi_id, csk_id, 'MORE', 5, FALSE),
    (bet_3_41_id, match_3_id, prachi_id, mi_id, 'MORE', 5, FALSE),
    (bet_3_42_id, match_3_id, kunal_id, csk_id, 'MORE', 5, FALSE),
    (bet_4_43_id, match_4_id, madan_id, lsg_id, 'LESS', 5, FALSE),
    (bet_4_44_id, match_4_id, anshu_id, lsg_id, 'MORE', 5, FALSE),
    (bet_4_45_id, match_4_id, pratibha_id, dc_id, 'LESS', 5, FALSE),
    (bet_4_46_id, match_4_id, reena_id, dc_id, 'MORE', 5, TRUE),
    (bet_4_47_id, match_4_id, suresh_id, lsg_id, 'LESS', 5, FALSE),
    (bet_4_48_id, match_4_id, pamela_id, dc_id, 'MORE', 5, TRUE),
    (bet_4_49_id, match_4_id, sanjeev_id, dc_id, 'MORE', 5, TRUE),
    (bet_4_50_id, match_4_id, archit_id, dc_id, 'MORE', 5, TRUE),
    (bet_4_51_id, match_4_id, slaks_id, lsg_id, 'MORE', 5, FALSE),
    (bet_4_52_id, match_4_id, sanjana_id, dc_id, 'LESS', 5, FALSE),
    (bet_4_53_id, match_4_id, rajiv_id, dc_id, 'LESS', 5, FALSE),
    (bet_4_54_id, match_4_id, nidhi_id, lsg_id, 'MORE', 5, FALSE),
    (bet_4_55_id, match_4_id, prachi_id, lsg_id, 'MORE', 5, FALSE),
    (bet_4_56_id, match_4_id, kunal_id, dc_id, 'MORE', 5, TRUE),
    (bet_5_57_id, match_5_id, madan_id, gt_id, 'MORE', 5, FALSE),
    (bet_5_58_id, match_5_id, anshu_id, gt_id, 'MORE', 5, FALSE),
    (bet_5_59_id, match_5_id, pratibha_id, gt_id, 'LESS', 5, FALSE),
    (bet_5_60_id, match_5_id, reena_id, gt_id, 'LESS', 5, FALSE),
    (bet_5_61_id, match_5_id, suresh_id, gt_id, 'MORE', 5, FALSE),
    (bet_5_62_id, match_5_id, pamela_id, gt_id, 'MORE', 5, FALSE),
    (bet_5_63_id, match_5_id, sanjeev_id, pbks_id, 'MORE', 5, TRUE),
    (bet_5_64_id, match_5_id, archit_id, gt_id, 'LESS', 5, FALSE),
    (bet_5_65_id, match_5_id, slaks_id, gt_id, 'MORE', 5, FALSE),
    (bet_5_66_id, match_5_id, sanjana_id, pbks_id, 'MORE', 5, TRUE),
    (bet_5_67_id, match_5_id, rajiv_id, pbks_id, 'LESS', 5, FALSE),
    (bet_5_68_id, match_5_id, nidhi_id, gt_id, 'MORE', 5, FALSE),
    (bet_5_69_id, match_5_id, prachi_id, pbks_id, 'LESS', 5, FALSE),
    (bet_5_70_id, match_5_id, kunal_id, gt_id, 'LESS', 5, FALSE),
    (bet_6_71_id, match_6_id, madan_id, kkr_id, 'MORE', 5, FALSE),
    (bet_6_72_id, match_6_id, anshu_id, kkr_id, 'MORE', 5, FALSE),
    (bet_6_73_id, match_6_id, pratibha_id, rr_id, 'MORE', 5, FALSE),
    (bet_6_74_id, match_6_id, reena_id, rr_id, 'MORE', 5, FALSE),
    (bet_6_75_id, match_6_id, suresh_id, rr_id, 'LESS', 5, FALSE),
    (bet_6_76_id, match_6_id, pamela_id, kkr_id, 'LESS', 5, TRUE),
    (bet_6_77_id, match_6_id, sanjeev_id, kkr_id, 'MORE', 5, FALSE),
    (bet_6_78_id, match_6_id, archit_id, rr_id, 'MORE', 5, FALSE),
    (bet_6_79_id, match_6_id, slaks_id, rr_id, 'MORE', 5, FALSE),
    (bet_6_80_id, match_6_id, sanjana_id, rr_id, 'MORE', 5, FALSE),
    (bet_6_81_id, match_6_id, rajiv_id, rr_id, 'LESS', 5, FALSE),
    (bet_6_82_id, match_6_id, nidhi_id, kkr_id, 'MORE', 5, FALSE),
    (bet_6_83_id, match_6_id, prachi_id, kkr_id, 'MORE', 5, FALSE),
    (bet_6_84_id, match_6_id, kunal_id, kkr_id, 'MORE', 5, FALSE),
    (bet_7_85_id, match_7_id, madan_id, lsg_id, 'MORE', 5, TRUE),
    (bet_7_86_id, match_7_id, anshu_id, srh_id, 'LESS', 5, FALSE),
    (bet_7_87_id, match_7_id, pratibha_id, srh_id, 'LESS', 5, FALSE),
    (bet_7_88_id, match_7_id, reena_id, lsg_id, 'LESS', 5, FALSE),
    (bet_7_89_id, match_7_id, suresh_id, srh_id, 'MORE', 5, FALSE),
    (bet_7_90_id, match_7_id, pamela_id, lsg_id, 'MORE', 5, TRUE),
    (bet_7_91_id, match_7_id, sanjeev_id, lsg_id, 'MORE', 5, TRUE),
    (bet_7_92_id, match_7_id, archit_id, srh_id, 'MORE', 5, FALSE),
    (bet_7_93_id, match_7_id, slaks_id, srh_id, 'MORE', 5, FALSE),
    (bet_7_94_id, match_7_id, sanjana_id, srh_id, 'MORE', 5, FALSE),
    (bet_7_95_id, match_7_id, rajiv_id, srh_id, 'LESS', 5, FALSE),
    (bet_7_96_id, match_7_id, nidhi_id, srh_id, 'MORE', 5, FALSE),
    (bet_7_97_id, match_7_id, prachi_id, srh_id, 'LESS', 5, FALSE),
    (bet_7_98_id, match_7_id, kunal_id, lsg_id, 'LESS', 5, FALSE),
    (bet_8_99_id, match_8_id, madan_id, rcb_id, 'LESS', 5, TRUE),
    (bet_8_100_id, match_8_id, anshu_id, csk_id, 'MORE', 5, FALSE),
    (bet_8_101_id, match_8_id, pratibha_id, rcb_id, 'MORE', 5, FALSE),
    (bet_8_102_id, match_8_id, reena_id, csk_id, 'MORE', 5, FALSE),
    (bet_8_103_id, match_8_id, suresh_id, rcb_id, 'MORE', 5, FALSE),
    (bet_8_104_id, match_8_id, pamela_id, rcb_id, 'MORE', 5, FALSE),
    (bet_8_105_id, match_8_id, sanjeev_id, csk_id, 'LESS', 5, FALSE),
    (bet_8_106_id, match_8_id, archit_id, csk_id, 'LESS', 5, FALSE),
    (bet_8_107_id, match_8_id, slaks_id, rcb_id, 'MORE', 5, FALSE),
    (bet_8_108_id, match_8_id, sanjana_id, rcb_id, 'LESS', 5, TRUE),
    (bet_8_109_id, match_8_id, rajiv_id, rcb_id, 'MORE', 5, FALSE),
    (bet_8_110_id, match_8_id, nidhi_id, csk_id, 'LESS', 5, FALSE),
    (bet_8_111_id, match_8_id, prachi_id, rcb_id, 'MORE', 5, FALSE),
    (bet_8_112_id, match_8_id, kunal_id, csk_id, 'MORE', 5, FALSE),
    (bet_9_113_id, match_9_id, madan_id, gt_id, 'LESS', 5, FALSE),
    (bet_9_114_id, match_9_id, anshu_id, gt_id, 'MORE', 5, TRUE),
    (bet_9_115_id, match_9_id, pratibha_id, gt_id, 'MORE', 5, TRUE),
    (bet_9_116_id, match_9_id, reena_id, mi_id, 'MORE', 5, FALSE),
    (bet_9_117_id, match_9_id, suresh_id, mi_id, 'MORE', 5, FALSE),
    (bet_9_118_id, match_9_id, pamela_id, mi_id, 'LESS', 5, FALSE),
    (bet_9_119_id, match_9_id, sanjeev_id, mi_id, 'LESS', 5, FALSE),
    (bet_9_120_id, match_9_id, archit_id, mi_id, 'MORE', 5, FALSE),
    (bet_9_121_id, match_9_id, slaks_id, mi_id, 'MORE', 5, FALSE),
    (bet_9_122_id, match_9_id, sanjana_id, mi_id, 'MORE', 5, FALSE),
    (bet_9_123_id, match_9_id, rajiv_id, mi_id, 'LESS', 5, FALSE),
    (bet_9_124_id, match_9_id, nidhi_id, gt_id, 'MORE', 5, TRUE),
    (bet_9_125_id, match_9_id, prachi_id, mi_id, 'MORE', 5, FALSE),
    (bet_9_126_id, match_9_id, kunal_id, mi_id, 'MORE', 5, FALSE),
    (bet_10_127_id, match_10_id, madan_id, dc_id, 'MORE', 5, FALSE),
    (bet_10_128_id, match_10_id, anshu_id, srh_id, 'MORE', 5, FALSE),
    (bet_10_129_id, match_10_id, pratibha_id, srh_id, 'LESS', 5, FALSE),
    (bet_10_130_id, match_10_id, reena_id, dc_id, 'LESS', 5, TRUE),
    (bet_10_131_id, match_10_id, suresh_id, srh_id, 'MORE', 5, FALSE),
    (bet_10_132_id, match_10_id, pamela_id, srh_id, 'LESS', 5, FALSE),
    (bet_10_133_id, match_10_id, sanjeev_id, dc_id, 'LESS', 5, TRUE),
    (bet_10_134_id, match_10_id, archit_id, dc_id, 'MORE', 5, FALSE),
    (bet_10_135_id, match_10_id, slaks_id, dc_id, 'LESS', 5, TRUE),
    (bet_10_136_id, match_10_id, sanjana_id, srh_id, 'MORE', 5, FALSE),
    (bet_10_137_id, match_10_id, rajiv_id, srh_id, 'LESS', 5, FALSE),
    (bet_10_138_id, match_10_id, nidhi_id, srh_id, 'LESS', 5, FALSE),
    (bet_10_139_id, match_10_id, prachi_id, srh_id, 'MORE', 5, FALSE),
    (bet_10_140_id, match_10_id, kunal_id, srh_id, 'MORE', 5, FALSE),
    (bet_11_141_id, match_11_id, madan_id, rr_id, 'MORE', 5, FALSE),
    (bet_11_142_id, match_11_id, anshu_id, csk_id, 'MORE', 5, FALSE),
    (bet_11_143_id, match_11_id, pratibha_id, rr_id, 'LESS', 5, TRUE),
    (bet_11_144_id, match_11_id, reena_id, rr_id, 'LESS', 5, TRUE),
    (bet_11_145_id, match_11_id, suresh_id, csk_id, 'LESS', 5, FALSE),
    (bet_11_146_id, match_11_id, pamela_id, rr_id, 'LESS', 5, TRUE),
    (bet_11_147_id, match_11_id, sanjeev_id, csk_id, 'LESS', 5, FALSE),
    (bet_11_148_id, match_11_id, archit_id, rr_id, 'MORE', 5, FALSE),
    (bet_11_149_id, match_11_id, slaks_id, csk_id, 'LESS', 5, FALSE),
    (bet_11_150_id, match_11_id, sanjana_id, csk_id, 'LESS', 5, FALSE),
    (bet_11_151_id, match_11_id, rajiv_id, rr_id, 'LESS', 5, TRUE),
    (bet_11_152_id, match_11_id, nidhi_id, csk_id, 'LESS', 5, FALSE),
    (bet_11_153_id, match_11_id, prachi_id, csk_id, 'LESS', 5, FALSE),
    (bet_11_154_id, match_11_id, kunal_id, csk_id, 'MORE', 5, FALSE),
    (bet_12_155_id, match_12_id, madan_id, kkr_id, 'MORE', 5, FALSE),
    (bet_12_156_id, match_12_id, anshu_id, mi_id, 'MORE', 5, FALSE),
    (bet_12_157_id, match_12_id, pratibha_id, kkr_id, 'LESS', 5, FALSE),
    (bet_12_158_id, match_12_id, reena_id, kkr_id, 'LESS', 5, FALSE),
    (bet_12_159_id, match_12_id, suresh_id, mi_id, 'LESS', 5, TRUE),
    (bet_12_160_id, match_12_id, pamela_id, kkr_id, 'MORE', 5, FALSE),
    (bet_12_161_id, match_12_id, sanjeev_id, mi_id, 'LESS', 5, TRUE),
    (bet_12_162_id, match_12_id, archit_id, mi_id, 'MORE', 5, FALSE),
    (bet_12_163_id, match_12_id, slaks_id, mi_id, 'LESS', 5, TRUE),
    (bet_12_164_id, match_12_id, sanjana_id, kkr_id, 'MORE', 5, FALSE),
    (bet_12_165_id, match_12_id, rajiv_id, kkr_id, 'LESS', 5, FALSE),
    (bet_12_166_id, match_12_id, nidhi_id, mi_id, 'LESS', 5, TRUE),
    (bet_12_167_id, match_12_id, prachi_id, kkr_id, 'MORE', 5, FALSE),
    (bet_12_168_id, match_12_id, kunal_id, mi_id, 'MORE', 5, FALSE),
    (bet_13_169_id, match_13_id, madan_id, pbks_id, 'MORE', 5, FALSE),
    (bet_13_170_id, match_13_id, anshu_id, lsg_id, 'MORE', 5, FALSE),
    (bet_13_171_id, match_13_id, pratibha_id, lsg_id, 'LESS', 5, FALSE),
    (bet_13_172_id, match_13_id, reena_id, lsg_id, 'LESS', 5, FALSE),
    (bet_13_173_id, match_13_id, suresh_id, lsg_id, 'MORE', 5, FALSE),
    (bet_13_174_id, match_13_id, pamela_id, lsg_id, 'LESS', 5, FALSE),
    (bet_13_175_id, match_13_id, sanjeev_id, pbks_id, 'MORE', 5, FALSE),
    (bet_13_176_id, match_13_id, archit_id, pbks_id, 'MORE', 5, FALSE),
    (bet_13_177_id, match_13_id, slaks_id, pbks_id, 'MORE', 5, FALSE),
    (bet_13_178_id, match_13_id, sanjana_id, pbks_id, 'MORE', 5, FALSE),
    (bet_13_179_id, match_13_id, rajiv_id, pbks_id, 'LESS', 5, TRUE),
    (bet_13_180_id, match_13_id, nidhi_id, lsg_id, 'MORE', 5, FALSE),
    (bet_13_181_id, match_13_id, prachi_id, pbks_id, 'LESS', 5, TRUE),
    (bet_13_182_id, match_13_id, kunal_id, pbks_id, 'LESS', 5, TRUE),
    (bet_14_183_id, match_14_id, madan_id, rcb_id, 'MORE', 5, FALSE),
    (bet_14_184_id, match_14_id, anshu_id, rcb_id, 'MORE', 5, FALSE),
    (bet_14_185_id, match_14_id, pratibha_id, rcb_id, 'MORE', 5, FALSE),
    (bet_14_186_id, match_14_id, reena_id, gt_id, 'MORE', 5, FALSE),
    (bet_14_187_id, match_14_id, suresh_id, rcb_id, 'LESS', 5, FALSE),
    (bet_14_188_id, match_14_id, pamela_id, rcb_id, 'LESS', 5, FALSE),
    (bet_14_189_id, match_14_id, sanjeev_id, gt_id, 'LESS', 5, TRUE),
    (bet_14_190_id, match_14_id, archit_id, gt_id, 'LESS', 5, TRUE),
    (bet_14_191_id, match_14_id, slaks_id, rcb_id, 'LESS', 5, FALSE),
    (bet_14_192_id, match_14_id, sanjana_id, rcb_id, 'MORE', 5, FALSE),
    (bet_14_193_id, match_14_id, rajiv_id, rcb_id, 'LESS', 5, FALSE),
    (bet_14_194_id, match_14_id, nidhi_id, gt_id, 'MORE', 5, FALSE),
    (bet_14_195_id, match_14_id, prachi_id, rcb_id, 'MORE', 5, FALSE),
    (bet_14_196_id, match_14_id, kunal_id, rcb_id, 'MORE', 5, FALSE),
    (bet_15_197_id, match_15_id, madan_id, kkr_id, 'LESS', 5, TRUE),
    (bet_15_198_id, match_15_id, anshu_id, kkr_id, 'MORE', 5, FALSE),
    (bet_15_199_id, match_15_id, pratibha_id, srh_id, 'MORE', 5, FALSE),
    (bet_15_200_id, match_15_id, reena_id, srh_id, 'MORE', 5, FALSE),
    (bet_15_201_id, match_15_id, suresh_id, kkr_id, 'MORE', 5, FALSE),
    (bet_15_202_id, match_15_id, pamela_id, srh_id, 'LESS', 5, FALSE),
    (bet_15_203_id, match_15_id, sanjeev_id, kkr_id, 'LESS', 5, TRUE),
    (bet_15_204_id, match_15_id, archit_id, kkr_id, 'LESS', 5, TRUE),
    (bet_15_205_id, match_15_id, slaks_id, kkr_id, 'MORE', 5, FALSE),
    (bet_15_206_id, match_15_id, sanjana_id, kkr_id, 'LESS', 5, TRUE),
    (bet_15_207_id, match_15_id, rajiv_id, srh_id, 'LESS', 5, FALSE),
    (bet_15_208_id, match_15_id, nidhi_id, srh_id, 'LESS', 5, FALSE),
    (bet_15_209_id, match_15_id, prachi_id, kkr_id, 'MORE', 5, FALSE),
    (bet_15_210_id, match_15_id, kunal_id, srh_id, 'LESS', 5, FALSE),
    (bet_16_211_id, match_16_id, madan_id, mi_id, 'MORE', 5, FALSE),
    (bet_16_212_id, match_16_id, anshu_id, lsg_id, 'LESS', 5, FALSE),
    (bet_16_213_id, match_16_id, pratibha_id, mi_id, 'LESS', 5, FALSE),
    (bet_16_214_id, match_16_id, reena_id, mi_id, 'MORE', 5, FALSE),
    (bet_16_215_id, match_16_id, suresh_id, lsg_id, 'LESS', 5, FALSE),
    (bet_16_216_id, match_16_id, pamela_id, lsg_id, 'LESS', 5, FALSE),
    (bet_16_217_id, match_16_id, sanjeev_id, lsg_id, 'LESS', 5, FALSE),
    (bet_16_218_id, match_16_id, archit_id, lsg_id, 'LESS', 5, FALSE),
    (bet_16_219_id, match_16_id, slaks_id, lsg_id, 'MORE', 5, TRUE),
    (bet_16_220_id, match_16_id, sanjana_id, mi_id, 'LESS', 5, FALSE),
    (bet_16_221_id, match_16_id, rajiv_id, mi_id, 'LESS', 5, FALSE),
    (bet_16_222_id, match_16_id, nidhi_id, lsg_id, 'MORE', 5, TRUE),
    (bet_16_223_id, match_16_id, prachi_id, lsg_id, 'MORE', 5, TRUE),
    (bet_16_224_id, match_16_id, kunal_id, lsg_id, 'LESS', 5, FALSE),
    (bet_17_225_id, match_17_id, madan_id, csk_id, 'MORE', 5, FALSE),
    (bet_17_226_id, match_17_id, anshu_id, csk_id, 'LESS', 5, FALSE),
    (bet_17_227_id, match_17_id, pratibha_id, csk_id, 'LESS', 5, FALSE),
    (bet_17_228_id, match_17_id, reena_id, csk_id, 'LESS', 5, FALSE),
    (bet_17_229_id, match_17_id, suresh_id, csk_id, 'LESS', 5, FALSE),
    (bet_17_230_id, match_17_id, pamela_id, dc_id, 'LESS', 5, TRUE),
    (bet_17_231_id, match_17_id, sanjeev_id, dc_id, 'LESS', 5, TRUE),
    (bet_17_232_id, match_17_id, archit_id, dc_id, 'LESS', 5, TRUE),
    (bet_17_233_id, match_17_id, slaks_id, csk_id, 'LESS', 5, FALSE),
    (bet_17_234_id, match_17_id, sanjana_id, dc_id, 'LESS', 5, TRUE),
    (bet_17_235_id, match_17_id, rajiv_id, csk_id, 'LESS', 5, FALSE),
    (bet_17_236_id, match_17_id, nidhi_id, dc_id, 'LESS', 5, TRUE),
    (bet_17_237_id, match_17_id, prachi_id, dc_id, 'MORE', 5, FALSE),
    (bet_17_238_id, match_17_id, kunal_id, csk_id, 'LESS', 5, FALSE),
    (bet_18_239_id, match_18_id, madan_id, rr_id, 'MORE', 5, FALSE),
    (bet_18_240_id, match_18_id, anshu_id, pbks_id, 'MORE', 5, FALSE),
    (bet_18_241_id, match_18_id, pratibha_id, pbks_id, 'MORE', 5, FALSE),
    (bet_18_242_id, match_18_id, reena_id, pbks_id, 'LESS', 5, FALSE),
    (bet_18_243_id, match_18_id, suresh_id, pbks_id, 'LESS', 5, FALSE),
    (bet_18_244_id, match_18_id, pamela_id, pbks_id, 'LESS', 5, FALSE),
    (bet_18_245_id, match_18_id, sanjeev_id, rr_id, 'LESS', 5, FALSE),
    (bet_18_246_id, match_18_id, archit_id, rr_id, 'MORE', 5, FALSE),
    (bet_18_247_id, match_18_id, slaks_id, pbks_id, 'MORE', 5, FALSE),
    (bet_18_248_id, match_18_id, sanjana_id, pbks_id, 'MORE', 5, FALSE),
    (bet_18_249_id, match_18_id, rajiv_id, pbks_id, 'LESS', 5, FALSE),
    (bet_18_250_id, match_18_id, nidhi_id, rr_id, 'LESS', 5, FALSE),
    (bet_18_251_id, match_18_id, prachi_id, pbks_id, 'MORE', 5, FALSE),
    (bet_18_252_id, match_18_id, kunal_id, pbks_id, 'LESS', 5, FALSE);

END $$;
