import pandas as pd
from datetime import datetime

df = pd.read_csv('../csvs/Performance.csv')

for index, row in df.iterrows():
    print(row)

# Every row in this dataframe shows each juaari's net winnings after a game
# We want to use this and generate data to insert into sql table juaari_win_history
# The table has the following columns:
# - juaari_id
# - date
# - match_id
# - bet_id
# - delta_winnings_this_game
# - accumulated_winnings

# First: juaari id
# # We can get the juaari from dataframe header, if we loop through the index
# # Then since we need to store the juaari ID, we can copy the map of juari name to ID from seeds text file and convert to a python map
juaari_name_to_id_variable_map = {
    "Nidhi": "091e4931-51e7-4e2f-9277-30f34ebf006e",
    "Sanjana": "0d7f55eb-c101-4366-b01c-12c78dd0dc42",
    "Kunal": "22366429-c4ff-4cec-bd43-2e3c6dc6d676",
    "Sanjeev": "24dfbdaa-8839-4692-bec5-ba213062c9e9",
    "Rajiv": "278e27c7-c1d0-47eb-a17e-206dfae0ab54",
    "Pamela": "3a281f9b-1b23-4a3f-ac3a-887571c96612",
    "S.Laks": "80a2604a-399f-48e3-a22b-989b035dee02",
    "Archit": "97695455-d3ab-49ae-9feb-f385117e360a",
    "Suresh": "9f40dba6-7f53-4f4c-a1d5-54aad2ae9058",
    "Anshu": "b3d480e4-f868-4c7f-bc3d-3db38c62a38a",
    "Reena": "be08b4a2-b430-48c7-b56a-cb34b71eaae1",
    "Pratibha": "ccfb2098-6fde-405f-ba80-2b153bab89ef",
    "Prachi": "f5f3efe6-36ee-4d5b-81e7-0e380b1e4785",
    "Madan": "ff2c177f-7ed9-42a1-8180-2cef8f0c072f",
}

# Second: date and match_id
# # Date needs to be a timestamp with timezone of UTC. It also needs to be the date of a match.
# # We can cheat a little here: copy the dates from the 002_match_data.sql file, because we know we only want the first 17 matches

match_1_id = 'fec43c72-9ad4-4938-8191-d4eb843a5bf5'
match_2_id = '0167a147-70bb-4f4c-9cc8-0a62b354d96d'
match_3_id = '9a00522b-c485-439e-b54d-64893f6304a7'
match_4_id = '27dbe00f-8c65-4a10-9077-6976f6389444'
match_5_id = '1a4c2a67-d8b9-4907-a6ff-e1845abdcdc0'
match_6_id = '580c5c36-ea8c-430c-8a07-55af92ce25b6'
match_7_id = '40751ab6-5f44-4964-affe-c85d54a4c09e'
match_8_id = '54f13b92-1038-432d-8615-a5ca3c41b7f1'
match_9_id = 'ba207c15-2686-49ee-a6a9-a881459dbb2f'
match_10_id = 'f73199c1-dac5-4567-b2d4-957b308dc4b4'
match_11_id = '14475ca9-3703-4b1c-844f-41c40ec17b6a'
match_12_id = 'e7984264-c380-440a-ba1d-39ccaf44725e'
match_13_id = '3f68a480-a4b9-405b-89b7-3b499c10db98'
match_14_id = '92660fbf-eb0e-41e5-82c1-279427821425'
match_15_id = '6fe4c8a5-6ba7-4f12-88b1-35da090ac097'
match_16_id = 'ffc4b933-7fd5-4f30-83c8-2bb814a38db9'
match_17_id = '5d605b58-89cb-438a-be98-5983e09ed2b5'

match_1_date = '2025-03-22 14:00:00+00'
match_2_date = '2025-03-23 10:00:00+00'
match_3_date = '2025-03-23 14:00:00+00'
match_4_date = '2025-03-24 14:00:00+00'
match_5_date = '2025-03-25 14:00:00+00'
match_6_date = '2025-03-26 14:00:00+00'
match_7_date = '2025-03-27 14:00:00+00'
match_8_date = '2025-03-28 14:00:00+00'
match_9_date = '2025-03-29 14:00:00+00'
match_10_date = '2025-03-30 10:00:00+00'
match_11_date = '2025-03-30 14:00:00+00'
match_12_date = '2025-03-31 14:00:00+00'
match_13_date = '2025-04-1 14:00:00+00'
match_14_date = '2025-04-2 14:00:00+00'
match_15_date = '2025-04-3 14:00:00+00'
match_16_date = '2025-04-4 14:00:00+00'
match_17_date = '2025-04-5 10:00:00+00'


match_to_date_and_uuid_map = {
    1: (match_1_date, match_1_id),
    2: (match_2_date, match_2_id),
    3: (match_3_date, match_3_id),
    4: (match_4_date, match_4_id),
    5: (match_5_date, match_5_id),
    6: (match_6_date, match_6_id),
    7: (match_7_date, match_7_id),
    8: (match_8_date, match_8_id),
    9: (match_9_date, match_9_id),
    10: (match_10_date, match_10_id),
    11: (match_11_date, match_11_id),
    12: (match_12_date, match_12_id),
    13: (match_13_date, match_13_id),
    14: (match_14_date, match_14_id),
    15: (match_15_date, match_15_id),
    16: (match_16_date, match_16_id),
    17: (match_17_date, match_17_id),
}

# next, we need bet_ids for each bet
# We can hack this too, because bet_ids are in the 003_bets_data.sql file
# We can just copy the bet_ids from there
bet_1_1_id = '81a1bae0-3573-4307-9fd2-85586f7c27f7'
bet_1_2_id = '19ea61d5-4404-4e93-83cc-48020754a8ea'
bet_1_3_id = '4a16c023-9581-406f-831a-f27b7a0cda5f'
bet_1_4_id = '76568870-5fce-47e9-b1da-ba55462bc596'
bet_1_5_id = '0eaddae5-8f30-4a34-97bc-647e162b6168'
bet_1_6_id = '9963d65a-2c89-4603-8685-0e5a97ee1b65'
bet_1_7_id = '1cdc20d5-ba3a-4bee-a233-1a2da10ab230'
bet_1_8_id = 'ccf04d1d-1526-4685-819e-2e0f13c5b384'
bet_1_9_id = 'ffd5be07-dcc3-479a-b26e-82bd909488d3'
bet_1_10_id = 'bc98692f-820d-4cec-9696-446e9342fe05'
bet_1_11_id = 'f1977a68-52fd-4b9f-92be-e03a27fc66f3'
bet_1_12_id = '9cc465cd-f213-49ab-afcc-e90427c9b377'
bet_1_13_id = '77e6d912-bc4d-4511-8e49-02f8fd95220d'
bet_1_14_id = '534fe8a9-f9f9-4333-affd-bc16492e36b7'
bet_2_15_id = 'bb9988af-6297-49c0-9638-92e60eec2495'
bet_2_16_id = '15e91018-582f-435d-a265-2783b5c319d3'
bet_2_17_id = 'e2b90099-3b2c-47b6-9f8d-95d9d8fb8898'
bet_2_18_id = '2b81e6a0-189b-4734-a076-e3ffddb41f24'
bet_2_19_id = '7386934b-e3e6-48dc-8f87-a89eaf6e93a6'
bet_2_20_id = '2fc57198-f915-4f3b-a77b-ef3011591648'
bet_2_21_id = '61a1b4df-347e-4c31-afea-d11fa01c5d77'
bet_2_22_id = 'e1341430-4bb4-42b1-8ce4-728d31a5eb3f'
bet_2_23_id = 'd354af81-c37c-4b96-a56f-846711d701e7'
bet_2_24_id = 'e51e91e1-7554-44cc-8b72-08f5741b44ec'
bet_2_25_id = 'f8007dd9-6077-4359-8899-14a319bea0f5'
bet_2_26_id = '9ce1d700-a090-401c-9c3c-70a7b81fb4a7'
bet_2_27_id = '64c99170-0acd-4250-8ec5-73dce64295fe'
bet_2_28_id = '150f2e9e-06d7-40f3-bc1d-1ca03a8fc066'
bet_3_29_id = '1e22f1cf-39ef-4859-b1f6-a5a226883c4e'
bet_3_30_id = 'e9917fe8-77f4-4d96-9f1d-aa3d5902c718'
bet_3_31_id = 'f8e54980-8f4a-4d8a-b767-2b2888ba41aa'
bet_3_32_id = '58f5942e-c8cb-45bf-bba8-3277d0f51297'
bet_3_33_id = 'de1959bc-4b40-4c20-bfe5-95108425a8be'
bet_3_34_id = 'a50a20ed-bf28-4e65-802e-b3a26e81821c'
bet_3_35_id = '6aa2ca03-5b61-428a-aa7f-29fb9505d2eb'
bet_3_36_id = '641ddba7-c81b-4a43-8c94-be0a64e4b227'
bet_3_37_id = 'cadf19a2-f3f9-4211-8d61-8a992ec9d407'
bet_3_38_id = 'a91b68e3-c007-42a5-a7fa-00e2dce5dba3'
bet_3_39_id = 'c40607ee-4eb6-4cae-946d-579534a27196'
bet_3_40_id = '3cce43e6-2ed9-4361-9382-8c679782e224'
bet_3_41_id = '4b4b07fc-6556-4c1e-9b4b-e426a993e2ff'
bet_3_42_id = '5ab0d5f8-3d95-40d0-887a-233c29c85e7e'
bet_4_43_id = 'd096f1cc-0b2d-43cb-a6f4-ed50048ab8de'
bet_4_44_id = '229704b6-57e8-494f-ab32-3894c40c0e68'
bet_4_45_id = '9a145542-c3ac-435e-b562-c7063219f79b'
bet_4_46_id = 'beee0d36-4980-4468-9fd2-b7ac31559302'
bet_4_47_id = '11fa6477-81c5-44ae-aa80-a006ae097068'
bet_4_48_id = '2321fc8d-7226-4761-88d0-6317206dc003'
bet_4_49_id = 'ff4d779e-cbfd-46ff-9b0b-4ed754adbc73'
bet_4_50_id = '4fb12cb6-5190-421d-977d-a443384ad691'
bet_4_51_id = '9e917030-fdca-42d9-8de2-ddb838e0e220'
bet_4_52_id = 'b1c69138-c752-4517-bf32-954b887d62cc'
bet_4_53_id = '6e9a6352-7fb9-4470-b732-11cf7e618b02'
bet_4_54_id = 'a36679de-77b8-4336-8e7d-49407d3cc1b2'
bet_4_55_id = 'd7591175-74cf-40fc-8109-01f46064cc27'
bet_4_56_id = 'a63133a4-3d0c-4cdc-8964-333e673abd87'
bet_5_57_id = 'da6f7945-94f8-404f-8f6a-06460f0a3e39'
bet_5_58_id = '8dce8f61-4cc8-441d-85ec-3340659e4794'
bet_5_59_id = 'c9426bf8-e957-4c6c-9ad3-92b2b0a29a55'
bet_5_60_id = '5d81aedc-3555-4cad-b15d-cffb19fb8f7f'
bet_5_61_id = 'cc809669-0fb8-4ef5-bfae-5a53e6a8ff96'
bet_5_62_id = 'ecc4fbf2-7d67-4daa-ba6d-a3fec92a5307'
bet_5_63_id = '35824b0a-f0e3-46c1-9243-000e39937a93'
bet_5_64_id = '48244f9f-b2b8-44bc-a285-ad381b372ab3'
bet_5_65_id = 'ade15dca-8ebb-4ad4-8581-8c3d921ce769'
bet_5_66_id = 'b6aae41c-b2e2-4ac7-8309-040ad74a6681'
bet_5_67_id = 'ac386b2a-8391-4b5c-bd34-fea09f5efe41'
bet_5_68_id = '30495c4c-1de4-4b47-9f11-03e2e5aca74e'
bet_5_69_id = '40966b60-2b76-40e9-b6e2-0deb5bb2c236'
bet_5_70_id = '75a86af0-a867-44ac-a3ce-17aebee6ec0e'
bet_6_71_id = '30b83987-8519-408f-8f61-c47da170ad71'
bet_6_72_id = '70ef0bf4-1746-4000-be5c-6d9ca4859400'
bet_6_73_id = 'a7e20efa-7163-441b-a2dc-964cb24020c2'
bet_6_74_id = '197ff208-2fe7-4127-bed1-3eff2d4215f8'
bet_6_75_id = '373e638b-6c3b-4937-8df6-7ca69b838007'
bet_6_76_id = '9edcb26b-5c22-432e-add4-a829756d7230'
bet_6_77_id = 'abffdf80-bdfe-4e2a-950b-a32a8c98ebed'
bet_6_78_id = '036d17f5-2c9c-40b5-b00d-f5f52072f7d1'
bet_6_79_id = '75dc9356-6d6f-4116-ab71-85f3d4a087f9'
bet_6_80_id = 'a83d771f-d15b-46ee-b7a4-2588250e2efa'
bet_6_81_id = '6865ca92-16e6-478b-8d4a-b955ced84744'
bet_6_82_id = '36b014b3-ce36-4bd5-b053-55c6c85a11bb'
bet_6_83_id = '047047e4-382a-4d01-bbf2-a8ae6eef367e'
bet_6_84_id = 'd66c3975-3f3f-4ea4-b2b4-cf129ab129ce'
bet_7_85_id = '8df436ba-a415-4216-b3e1-0210701cc643'
bet_7_86_id = '48edc70d-0746-4c39-8ed2-dd651d5d9172'
bet_7_87_id = 'a83b97c0-be88-4002-b9c2-94d137f92b2b'
bet_7_88_id = '0f449f76-950c-4216-a0f0-ba27fadb207d'
bet_7_89_id = 'ab835217-1b36-48e3-bd3a-7b93a6911500'
bet_7_90_id = 'de470bba-48ba-4f28-a409-d0ce6b441bda'
bet_7_91_id = '77448250-a88c-4438-bf6f-5fd09e50e489'
bet_7_92_id = 'e380d408-026a-4312-9220-106b6a5b7eee'
bet_7_93_id = 'f172624a-a474-492a-8563-6a620327fcc1'
bet_7_94_id = 'a99a0a8f-ed21-4f77-af47-ba04aee16cbd'
bet_7_95_id = 'ca46986f-d1a0-4463-963a-2ac99d86876e'
bet_7_96_id = '1b6fb33f-740c-4ce8-a944-ded3fcc77857'
bet_7_97_id = '7eb2770b-556f-4947-95d2-3071dfa3661c'
bet_7_98_id = 'c150b74c-412f-42e6-92df-7a61fb1e11e8'
bet_8_99_id = '2063dbb0-7e48-41f6-81d7-2c2ea9382166'
bet_8_100_id = 'adcbfe72-c92d-41c4-8e0e-597ba623e57e'
bet_8_101_id = 'b270a2d5-c34c-4100-a2b9-a16acc557ccf'
bet_8_102_id = '9a768059-7f08-4a66-b18d-e3566910ab99'
bet_8_103_id = '34785ddd-297f-4dd9-a489-a4a9450f6855'
bet_8_104_id = 'f091cbec-60be-4e4b-95df-d3d07d8a49af'
bet_8_105_id = 'c2394425-5b7a-4424-816f-ae9567231d1a'
bet_8_106_id = '1c77f0a4-d1ec-4491-a5ab-60a9a16a9612'
bet_8_107_id = '1395c514-9ff9-47f3-bacf-e4b4c3fcc818'
bet_8_108_id = '154e949d-9210-4181-90cc-052fdf7d3fbf'
bet_8_109_id = 'fe5df26c-bdbe-4064-9325-0f5234ae337a'
bet_8_110_id = '2120b22f-0427-4d48-b8ea-e32350eb3252'
bet_8_111_id = '22a35aea-ec0b-4003-8d6a-d389b9d037b4'
bet_8_112_id = 'db025996-4bba-46be-8c0f-5777ff4b9f34'
bet_9_113_id = 'ae5457b5-b094-4a63-bacc-197e9ac55c2b'
bet_9_114_id = '0c502bcc-bfcb-4277-af24-7dd762ce6312'
bet_9_115_id = '404f5e62-a9d4-4273-8e6b-5e23afbd2f71'
bet_9_116_id = '52192c3c-781f-4765-951e-4b7d4c6dafae'
bet_9_117_id = '96082372-9574-4173-bf83-481a8c77339e'
bet_9_118_id = '6859af1a-e76e-4420-8ade-8340d260e055'
bet_9_119_id = '66f3f8a4-f455-4bdf-b840-22affdd2bdc9'
bet_9_120_id = 'd6337625-92e8-4319-aa54-6802329eebde'
bet_9_121_id = '7a1b2808-7c34-4f8b-bbd5-edbdd67211fe'
bet_9_122_id = '053826c0-96f6-49f6-9231-4fa1adf89a12'
bet_9_123_id = 'eb1eb0fd-ec90-4088-8274-897974182902'
bet_9_124_id = '9f00c8c4-5820-47e0-a065-e90df19e4923'
bet_9_125_id = '3efad341-c33e-4f38-84b6-c1cd105441e9'
bet_9_126_id = 'b190b520-e12f-4ffb-9db8-339c1f686890'
bet_10_127_id = '190c8f84-0c48-415d-9c04-923b04a4a0d8'
bet_10_128_id = 'af0cdcf0-91d3-4559-b748-038e02a1a338'
bet_10_129_id = '195eb426-dcd9-4cd8-ab71-9b6a747e9d9b'
bet_10_130_id = 'c0e60894-7327-46ca-8ad3-2c6855ced38b'
bet_10_131_id = 'f46774d4-f670-442b-b594-50d1dcffd625'
bet_10_132_id = '06a5450a-5fac-47f2-9617-f7ce79cdb7bd'
bet_10_133_id = 'dc7e9db2-e496-4450-99ce-74b75cfa9c63'
bet_10_134_id = '95d7ae97-a5a7-47d4-a6e8-b0f17965477d'
bet_10_135_id = '425dd183-2575-46f8-9b15-8c24620d0b6c'
bet_10_136_id = '666a44a1-4fc4-47be-bd72-62095a6aa6ec'
bet_10_137_id = '7887092f-bdfb-48fc-8951-c65fe4fad64a'
bet_10_138_id = '6673e1b8-0b84-4098-954c-997c5bec2685'
bet_10_139_id = '4e92e4de-99bb-44dd-a5bf-e8e51feea322'
bet_10_140_id = '9c2be948-93b8-413c-a5f3-7694e1b2c250'
bet_11_141_id = 'a2791be2-4aa9-4ad7-a637-fcbc87b29891'
bet_11_142_id = '0d3f8cba-7703-42c6-9143-4c7479a5b566'
bet_11_143_id = '4ed97d2b-d47b-4fad-b558-1695e77b618d'
bet_11_144_id = 'c0fe6c91-0029-49a6-b1ad-0316d2714990'
bet_11_145_id = '5feffe2e-0518-4267-a96e-d486a9619e72'
bet_11_146_id = '83b7440c-3a77-4c51-b82b-fdac75276921'
bet_11_147_id = '95a451c4-4add-49dc-82f7-1e2115f2a8e6'
bet_11_148_id = 'bd963a55-5a7f-4fdd-b47f-5d253b3d0889'
bet_11_149_id = '68d06a3b-f7fc-452d-9ccb-65d18320458b'
bet_11_150_id = '5e6b3a75-cb7f-4e56-8b78-29f547a2006a'
bet_11_151_id = '663113f3-3b53-44ab-ac82-f4b9622c65a7'
bet_11_152_id = '40b66143-1ea9-49bb-9f30-db6eac04bb9f'
bet_11_153_id = '9742fe4d-ef35-40ac-b0fb-d86f28e795e4'
bet_11_154_id = '9145384e-3a08-45a8-b229-0051a6a7b301'
bet_12_155_id = 'e59517fc-3985-4a8d-9810-5154d8128c49'
bet_12_156_id = 'ea49e275-d43e-4216-8976-22b2f6c0cc6f'
bet_12_157_id = '1a4dc989-17df-4c6e-bbfa-cf3480112de1'
bet_12_158_id = 'feeafd45-9504-4d0d-80f1-9dd360452a0a'
bet_12_159_id = '85cbcb50-f60f-4d48-b3ec-4425035c278f'
bet_12_160_id = 'd176883f-f1f3-4283-a9dd-19bb9c335969'
bet_12_161_id = '99530fc3-ad1b-48b6-b728-b292949b488d'
bet_12_162_id = '5490dfb9-d15a-412d-bde4-1a3484d5a105'
bet_12_163_id = 'a7b7f12b-58f6-48cf-b5ef-2f35f1f86a27'
bet_12_164_id = 'd2056c0a-caaa-41e1-9738-4390bd308d44'
bet_12_165_id = '2b100a8b-6293-4b85-af56-9705a594428a'
bet_12_166_id = 'f5fd7cc3-14f8-417c-83a1-a6f4a5b68a08'
bet_12_167_id = 'fcc38c34-eb1c-4374-8c65-58b9c3a4614e'
bet_12_168_id = '1bc4ef5c-a3d7-4762-abce-7620eb2c3f89'
bet_13_169_id = '9a623458-f7ec-40ec-9670-f0426a76c533'
bet_13_170_id = '41abd552-c9cd-4bdc-854d-3a7036906a17'
bet_13_171_id = 'dc1d70f9-a86c-4e92-8efd-66ede731086b'
bet_13_172_id = '7ef91a5c-fab9-499b-9881-3ca64885292a'
bet_13_173_id = '43924054-bbe7-441f-b671-4917eb21f01d'
bet_13_174_id = 'f9f06d52-4083-4da6-a634-252fbb92a808'
bet_13_175_id = '0fc7c58c-10e3-4b94-98ea-5954567f71d4'
bet_13_176_id = 'a5dbb3fd-f376-4860-b5e1-469c607b88da'
bet_13_177_id = '90c74923-1e2a-476c-bcd5-0b4a7a248227'
bet_13_178_id = '3e5ccff2-5645-4a7f-b18a-92d0332f8e61'
bet_13_179_id = 'ff9a3458-1ed7-4135-981e-2c1b0277d13d'
bet_13_180_id = '64e108e9-570b-4067-ae61-062db6299218'
bet_13_181_id = '7ddaac9f-c17b-4dd0-acad-2edc6c179384'
bet_13_182_id = '770f5108-8d51-4314-9e56-82b752727ee0'
bet_14_183_id = 'cc8b7b9d-759c-40e2-b741-4a842df05ddf'
bet_14_184_id = '46b17442-7a2f-4e1d-a64d-0b25488a12ab'
bet_14_185_id = 'a26b5ba1-71ef-43c4-8dcc-30d437f01875'
bet_14_186_id = 'ee694da2-96a2-4115-be67-05bdfb7a5ca8'
bet_14_187_id = '787a668d-647d-40d7-98ac-026cbb85bf3e'
bet_14_188_id = 'cbc4ae7f-a418-4500-afb6-59caa6b0cdf4'
bet_14_189_id = '79449bb8-37c8-45e4-95b3-c9751332154d'
bet_14_190_id = '0cf696a6-90ac-4b0d-9525-1b3f33ab902c'
bet_14_191_id = 'cf4a47fc-8b11-4509-bf1c-7bf6ee7af370'
bet_14_192_id = '779b1804-751a-4aa3-83ed-9c4554d9eef7'
bet_14_193_id = 'cf7f13a7-31be-440d-86b4-cf6cb72f09db'
bet_14_194_id = 'a278997f-325b-4e96-94b3-5986f2dd6a9a'
bet_14_195_id = 'feaa48f5-64f8-40e4-a65e-201019c6e6aa'
bet_14_196_id = 'c8f9e671-873e-4495-8113-cf13943742dd'
bet_15_197_id = 'e3ca9cb2-59bb-4cb5-aac9-42b238d82813'
bet_15_198_id = 'cc5f2cfd-fb2c-4b3e-ada3-0c5927966470'
bet_15_199_id = 'f1c6b98d-0bf1-47cd-84b8-0a034d4aa95f'
bet_15_200_id = 'd25d3c5f-ac4b-4955-aba5-dfddc0088a03'
bet_15_201_id = '2075a029-a6e2-4641-80ef-2fef1cd4df6a'
bet_15_202_id = '295b9b41-cafd-44a1-8db4-9fb18b8c1405'
bet_15_203_id = '714c8fab-070b-41ec-b6fd-ced8bf9ea6e8'
bet_15_204_id = 'f7900f53-e0ae-4b1d-bcb8-7f04f2b76c3f'
bet_15_205_id = 'e9491dd3-9447-4ffb-83b3-976e1756dddf'
bet_15_206_id = 'f48a42e2-131e-4832-84ba-33c3cd2ad75e'
bet_15_207_id = '6bbc6903-d3f2-49b7-8391-cb774c170b88'
bet_15_208_id = '1a05df0a-ec00-4749-b9b2-cdb980b5f1ad'
bet_15_209_id = 'adfb7afb-c7cf-4923-9958-d64e4f4a4134'
bet_15_210_id = 'df66cf8d-90a8-4983-806e-54718b1e8042'
bet_16_211_id = '2065b27e-7ae0-458f-abac-e7708eab1453'
bet_16_212_id = '00c21467-b39b-4209-823a-5a4408613d6c'
bet_16_213_id = 'b636c16f-d6af-4f3f-8813-b212e724cc29'
bet_16_214_id = 'fc3c1de0-b7d4-43ba-b19e-1e9225a6bb9b'
bet_16_215_id = '2cdcd100-8e94-4766-b5a6-0de129b748f0'
bet_16_216_id = 'f656c7cd-dfd5-4ec2-a61d-2829cd9259a2'
bet_16_217_id = '30a9897c-5934-4a7b-876f-c21cb0fc5b0c'
bet_16_218_id = '83f0af4c-12d4-4828-b6c4-811a513b1fcd'
bet_16_219_id = '68ca6b4e-bdd7-467d-b0fd-86b8a925a2fc'
bet_16_220_id = '7e624e33-f6f1-438c-8ca9-eb42bb89ead1'
bet_16_221_id = 'ab429f99-54c5-4738-b515-54dbdfd1cc1d'
bet_16_222_id = 'df362a44-52bd-4c85-8c59-7ea7c354e2d3'
bet_16_223_id = '508c1eef-205b-4bf7-89f9-7a74c84517a8'
bet_16_224_id = 'e48daec6-b6fc-4556-9681-fbf67df15688'
bet_17_225_id = 'e575dfde-fd4e-432e-a8cb-42ebd10e64df'
bet_17_226_id = '0059e59b-61f5-48eb-a14c-dd95a5bcecde'
bet_17_227_id = '104c7c94-be7e-40c9-a647-ee8528868616'
bet_17_228_id = '79f0ea2c-ff32-4b56-bee9-b59f7050f309'
bet_17_229_id = 'a4057f8c-6e93-40fc-861b-f76e241122a6'
bet_17_230_id = '5a26b787-b986-4620-a783-fb6431cb67fd'
bet_17_231_id = 'c041a2d3-9c04-4162-a110-46d2fa5f4086'
bet_17_232_id = 'bc30ac99-f590-4694-9ebd-3680bc48d3d4'
bet_17_233_id = 'ee5f1392-92ea-46a7-bab1-e03ff2a251bb'
bet_17_234_id = 'b8b322a0-fbec-4487-a258-18e37837fee1'
bet_17_235_id = '170ebb11-c8c2-489c-abd9-13bc053caaf3'
bet_17_236_id = '6c4270df-24b2-42d7-bd88-b07a68e5fe39'
bet_17_237_id = '5ec31c8d-9b88-4331-9b46-83f44a528652'
bet_17_238_id = '97e44c64-777e-4bfc-95cb-00beb9847cf7'

# We can use the bet variable names to figure out the bet_id for each bet
# The format of the bets is bet_<match_number>_<bet_number>_id
# So we can just iterate over the match_number and bet_number variables
# and construct the bet_id
# There is a fixed pattern in which the players are assigned to the bets
# Madan's bet is always the first bet for a match, kunal's is always last, etc. So we can create an offset.
# For match 1, madan's bet is bet_1_1_id, kunal's is bet_1_14_id
# For match 2, madan's bet is bet_2_15_id, kunal's is bet_2_28_id
# So for any match x, madan's bet is bet_x_x+1_id, kunal's is bet_x_x+14_id
# We can use this to retrieve the bet_id for each bet

player_to_bet_index_offset = {
    "Madan": 1,
    "Anshu": 2,
    "Pratibha": 3,
    "Reena": 4,
    "Suresh": 5,
    "Pamela": 6,
    "Sanjeev": 7,
    "Archit": 8,
    "S.Laks": 9,
    "Sanjana": 10,
    "Rajiv": 11,
    "Nidhi": 12,
    "Prachi": 13,
    "Kunal": 14,
}

# Lastly, delta_winnings_this_game is the amount that the player has won in the current game
# We can calculate this by subtracting the amount that the player has won in the previous game from the amount that the player has won in the current game
# We can do this by iterating over the dataframe and subtracting the amount that the player has won in the previous game from the amount that the player has won in the current game

# Loop through the dataframe by column
for juaari_name in df.columns:
    if juaari_name == "Party fund":
        continue
    juaari_id = juaari_name_to_id_variable_map[juaari_name]
    print("\n\nListing out winnings for ", juaari_name, "with ID ", juaari_id)
    for index, value in df[juaari_name].items():
        match_number = index + 1
        match_date, match_id = match_to_date_and_uuid_map[match_number]
        bet_id = "bet_"+str(match_number)+"_"+str(index*14 + player_to_bet_index_offset[juaari_name])+"_id"
        prev_winnings = 0
        if index > 0:
            prev_winnings = df[juaari_name][index-1]
        delta_winnings_this_game = value - prev_winnings
        total_winnings_so_far = value
        print(f'For Match {match_number}, {juaari_name} has bet {bet_id} on {match_date}. {juaari_name} has won {delta_winnings_this_game} in this game. Total winnings so far: {total_winnings_so_far}\n')

# This looks great. Now we need to write the SQL to update the juaari_winnings_history table following the above.

def generate_sql_win_history():
    sql = """-- Juaari win history data seed for Community Juaaris
-- Generated on {date}

DO $$
DECLARE
    -- Juaari UUIDs
    nidhi_id UUID := '091e4931-51e7-4e2f-9277-30f34ebf006e';
    sanjana_id UUID := '0d7f55eb-c101-4366-b01c-12c78dd0dc42';
    kunal_id UUID := '22366429-c4ff-4cec-bd43-2e3c6dc6d676';
    sanjeev_id UUID := '24dfbdaa-8839-4692-bec5-ba213062c9e9';
    rajiv_id UUID := '278e27c7-c1d0-47eb-a17e-206dfae0ab54';
    pamela_id UUID := '3a281f9b-1b23-4a3f-ac3a-887571c96612';
    slaks_id UUID := '80a2604a-399f-48e3-a22b-989b035dee02';
    archit_id UUID := '97695455-d3ab-49ae-9feb-f385117e360a';
    suresh_id UUID := '9f40dba6-7f53-4f4c-a1d5-54aad2ae9058';
    anshu_id UUID := 'b3d480e4-f868-4c7f-bc3d-3db38c62a38a';
    reena_id UUID := 'be08b4a2-b430-48c7-b56a-cb34b71eaae1';
    pratibha_id UUID := 'ccfb2098-6fde-405f-ba80-2b153bab89ef';
    prachi_id UUID := 'f5f3efe6-36ee-4d5b-81e7-0e380b1e4785';
    madan_id UUID := 'ff2c177f-7ed9-42a1-8180-2cef8f0c072f';

    -- Match UUIDs
    match_1_id UUID := 'fec43c72-9ad4-4938-8191-d4eb843a5bf5';
    match_2_id UUID := '0167a147-70bb-4f4c-9cc8-0a62b354d96d';
    match_3_id UUID := '9a00522b-c485-439e-b54d-64893f6304a7';
    match_4_id UUID := '27dbe00f-8c65-4a10-9077-6976f6389444';
    match_5_id UUID := '1a4c2a67-d8b9-4907-a6ff-e1845abdcdc0';
    match_6_id UUID := '580c5c36-ea8c-430c-8a07-55af92ce25b6';
    match_7_id UUID := '40751ab6-5f44-4964-affe-c85d54a4c09e';
    match_8_id UUID := '54f13b92-1038-432d-8615-a5ca3c41b7f1';
    match_9_id UUID := 'ba207c15-2686-49ee-a6a9-a881459dbb2f';
    match_10_id UUID := 'f73199c1-dac5-4567-b2d4-957b308dc4b4';
    match_11_id UUID := '14475ca9-3703-4b1c-844f-41c40ec17b6a';
    match_12_id UUID := 'e7984264-c380-440a-ba1d-39ccaf44725e';
    match_13_id UUID := '3f68a480-a4b9-405b-89b7-3b499c10db98';
    match_14_id UUID := '92660fbf-eb0e-41e5-82c1-279427821425';
    match_15_id UUID := '6fe4c8a5-6ba7-4f12-88b1-35da090ac097';
    match_16_id UUID := 'ffc4b933-7fd5-4f30-83c8-2bb814a38db9';
    match_17_id UUID := '5d605b58-89cb-438a-be98-5983e09ed2b5';

    -- Bet UUIDs
""".format(date=datetime.now().strftime("%Y-%m-%d"))

    # Add all bet UUIDs
    for i in range(1, 239):
        match_num = (i - 1) // 14 + 1
        sql += f"    bet_{match_num}_{i}_id UUID := '{globals()[f'bet_{match_num}_{i}_id']}';\n"

    sql += """
BEGIN
    
    INSERT INTO juaari_win_history (juaari_id, date, match_id, bet_id, delta_winnings_this_game, accumulated_winnings) VALUES
"""

    # Generate insert statements for each juaari's win history
    insert_statements = []
    for juaari_name in df.columns:
        if juaari_name == "Party fund":
            continue
        
        juaari_id = juaari_name_to_id_variable_map[juaari_name]
        
        for index, value in df[juaari_name].items():
            match_number = index + 1
            match_date, match_id = match_to_date_and_uuid_map[match_number]
            bet_id = f"bet_{match_number}_{index*14 + player_to_bet_index_offset[juaari_name]}_id"
            
            prev_winnings = 0
            if index > 0:
                prev_winnings = df[juaari_name][index-1]
            
            delta_winnings_this_game = value - prev_winnings
            total_winnings_so_far = value
            
            insert_statements.append(
                f"    ('{juaari_id}', '{match_date}', '{match_id}', {bet_id}, {delta_winnings_this_game:.1f}, {total_winnings_so_far:.1f})"
            )
    
    # Join all insert statements with commas and add a semicolon at the end
    sql += ",\n".join(insert_statements) + ";\n\nEND $$;\n"
    
    return sql

def write_sql_win_history_to_file():
    # Write to file
    with open("out/py_juaari_win_history.sql", "w") as f:
        f.write(generate_sql_win_history())
    print("Generated juaari win history SQL file with all win history data.")

def write_orange_cap_sql_to_file():
    with open("out/py_orange_cap.sql", "w") as f:
        f.write(generate_sql_orange_cap())
    print("Generated orange cap SQL file with all orange cap data.")


def write_purple_cap_sql_to_file():
    with open("out/py_purple_cap.sql", "w") as f:
        f.write(generate_sql_purple_cap())
    print("Generated purple cap SQL file with all purple cap data.")

def write_party_fund_sql_to_file():
    with open("out/py_party_fund.sql", "w") as f:
        f.write(generate_sql_party_fund())
    print("Generated party fund SQL file with all party fund data.")



def generate_sql_orange_cap():
    sql = """-- Orange cap data seed for Community Juaaris
-- Generated on {date}

DO $$
DECLARE
    -- Juaari UUIDs
    nidhi_id UUID := '091e4931-51e7-4e2f-9277-30f34ebf006e';
    sanjana_id UUID := '0d7f55eb-c101-4366-b01c-12c78dd0dc42';
    kunal_id UUID := '22366429-c4ff-4cec-bd43-2e3c6dc6d676';
    sanjeev_id UUID := '24dfbdaa-8839-4692-bec5-ba213062c9e9';
    rajiv_id UUID := '278e27c7-c1d0-47eb-a17e-206dfae0ab54';
    pamela_id UUID := '3a281f9b-1b23-4a3f-ac3a-887571c96612';
    slaks_id UUID := '80a2604a-399f-48e3-a22b-989b035dee02';
    archit_id UUID := '97695455-d3ab-49ae-9feb-f385117e360a';
    suresh_id UUID := '9f40dba6-7f53-4f4c-a1d5-54aad2ae9058';
    anshu_id UUID := 'b3d480e4-f868-4c7f-bc3d-3db38c62a38a';
    reena_id UUID := 'be08b4a2-b430-48c7-b56a-cb34b71eaae1';
    pratibha_id UUID := 'ccfb2098-6fde-405f-ba80-2b153bab89ef';
    prachi_id UUID := 'f5f3efe6-36ee-4d5b-81e7-0e380b1e4785';
    madan_id UUID := 'ff2c177f-7ed9-42a1-8180-2cef8f0c072f';
""".format(date=datetime.now().strftime("%Y-%m-%d"))

    sql += """
BEGIN
    
    INSERT INTO orange_cap (date, holder_id) VALUES
"""
    # Each row in the dataframe corresponds to a match
    # The minimum value of the row is the orange cap holder for that match
    # We can use the min function to get the index of the orange cap holder for each match, then lookup the table index to get the name of the juaari
    # Then use the juaaris map to get the juaari_id
    # Date can come from the match_to_date_and_uuid_map

    for match_num in match_to_date_and_uuid_map:
        match_date, match_id = match_to_date_and_uuid_map[match_num]
        min_juaari_name = df.iloc[match_num-1, ].idxmin()
        min_juaari_id = juaari_name_to_id_variable_map[min_juaari_name]
        sql += f"    ('{match_date}', '{min_juaari_id}'),\n"

    return sql

def generate_sql_purple_cap():
    sql = """-- Purple cap data seed for Community Juaaris
-- Generated on {date}

DO $$
DECLARE
    -- Juaari UUIDs
    nidhi_id UUID := '091e4931-51e7-4e2f-9277-30f34ebf006e';
    sanjana_id UUID := '0d7f55eb-c101-4366-b01c-12c78dd0dc42';
    kunal_id UUID := '22366429-c4ff-4cec-bd43-2e3c6dc6d676';
    sanjeev_id UUID := '24dfbdaa-8839-4692-bec5-ba213062c9e9';
    rajiv_id UUID := '278e27c7-c1d0-47eb-a17e-206dfae0ab54';
    pamela_id UUID := '3a281f9b-1b23-4a3f-ac3a-887571c96612';
    slaks_id UUID := '80a2604a-399f-48e3-a22b-989b035dee02';
    archit_id UUID := '97695455-d3ab-49ae-9feb-f385117e360a';
    suresh_id UUID := '9f40dba6-7f53-4f4c-a1d5-54aad2ae9058';
    anshu_id UUID := 'b3d480e4-f868-4c7f-bc3d-3db38c62a38a';
    reena_id UUID := 'be08b4a2-b430-48c7-b56a-cb34b71eaae1';
    pratibha_id UUID := 'ccfb2098-6fde-405f-ba80-2b153bab89ef';
    prachi_id UUID := 'f5f3efe6-36ee-4d5b-81e7-0e380b1e4785';
    madan_id UUID := 'ff2c177f-7ed9-42a1-8180-2cef8f0c072f';
""".format(date=datetime.now().strftime("%Y-%m-%d"))

    sql += """
BEGIN
    
    INSERT INTO orange_cap (date, holder_id) VALUES
"""
    # Each row in the dataframe corresponds to a match
    # The maximum value of the row is the purple cap holder for that match
    # We can use the max function to get the index of the purple cap holder for each match, then lookup the table index to get the name of the juaari
    # Then use the juaaris map to get the juaari_id
    # Date can come from the match_to_date_and_uuid_map

    df_purple_cap = df.iloc[:, :-1]
    for match_num in match_to_date_and_uuid_map:
        match_date, match_id = match_to_date_and_uuid_map[match_num]
        max_juaari_name = df_purple_cap.iloc[match_num-1, ].idxmax()
        max_juaari_id = juaari_name_to_id_variable_map[max_juaari_name]
        sql += f"    ('{match_date}', '{max_juaari_id}'),\n"

    return sql

def generate_sql_party_fund():
    sql = """-- Party fund data seed for Community Juaaris
-- Generated on {date}

DO $$
""".format(date=datetime.now().strftime("%Y-%m-%d"))

    sql += """
BEGIN
    
    INSERT INTO party_fund (date, amount) VALUES
"""
    # Each row in the dataframe corresponds to a match
    # The maximum value of the row is the purple cap holder for that match
    # We can use the max function to get the index of the purple cap holder for each match, then lookup the table index to get the name of the juaari
    # Then use the juaaris map to get the juaari_id
    # Date can come from the match_to_date_and_uuid_map

    for match_num in match_to_date_and_uuid_map:
        match_date, _ = match_to_date_and_uuid_map[match_num]
        party_fund_amount = df.iloc[match_num-1, ]["Party fund"]
        sql += f"    ('{match_date}', '{party_fund_amount}'),\n"

    return sql


# write_sql_win_history_to_file()
# write_orange_cap_sql_to_file()
# write_purple_cap_sql_to_file()
write_party_fund_sql_to_file()




