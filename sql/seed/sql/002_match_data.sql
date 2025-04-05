-- Match data seed for Community Juaaris
-- Generated on 2025-04-06

DO $$
DECLARE
    -- Match UUIDs for all regular season matches
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
    match_19_id UUID := '4671729c-5246-474f-96e3-a1619927d868'; -- SRH vs GT
    match_20_id UUID := '9b5143f7-cef7-4e03-9e55-25574de3656c'; -- MI vs RCB
    match_21_id UUID := 'dd81e3e5-020e-4a6e-b793-c79736ce6272'; -- KKR vs LSG
    match_22_id UUID := '53edd08d-002d-49b5-8c42-bd5ff6685f48'; -- PBKS vs CSK
    match_23_id UUID := 'c0063236-b9ff-416a-a446-a46ae15a36d3'; -- GT vs RR
    match_24_id UUID := 'e5d7cbff-a70e-420b-80e6-705ac68df66c'; -- RCB vs DC
    match_25_id UUID := 'fe2c6f36-be60-453d-8724-63cab000fa83'; -- CSK vs KKR
    match_26_id UUID := 'e3de9e43-786a-430a-a8c1-64ba6878c019'; -- LSG vs GT
    match_27_id UUID := '1d3eb8f0-73b0-475d-b479-6869b70d6594'; -- SRH vs PBKS
    match_28_id UUID := '220c0176-c631-432a-8a21-810d5673a83c'; -- RR vs RCB
    match_29_id UUID := '2a181372-2896-4610-b3f7-26e68e0a7036'; -- DC vs MI
    match_30_id UUID := '1792ae65-9a0d-4e30-991a-7218f5a21e70'; -- LSG vs CSK
    match_31_id UUID := '34e29731-f0b5-46b6-990a-c68324f65d4e'; -- PBKS vs KKR
    match_32_id UUID := 'f17aee09-01ee-4074-b364-aeb968ab9e6a'; -- DC vs RR
    match_33_id UUID := 'be4a4ab4-7333-424c-8cf9-94d2bc78b9c4'; -- MI vs SRH
    match_34_id UUID := '1db4cac6-c2a5-4a9f-93a5-dd64b7e7745c'; -- RCB vs PBKS
    match_35_id UUID := '3d96f86e-856f-4600-9939-61365f02b852'; -- GT vs DC
    match_36_id UUID := 'dd75dbb9-6b5f-45e8-97c9-d12d4811efa1'; -- RR vs LSG
    match_37_id UUID := '54caf06b-e906-4ec2-ad33-2bb3108d1d8d'; -- PBKS vs RCB
    match_38_id UUID := 'ef24387d-e957-4b7e-ad17-0a94695ba60e'; -- MI vs CSK
    match_39_id UUID := 'd343343a-c8bd-4473-a50e-bbc1aef32162'; -- KKR vs GT
    match_40_id UUID := '7b70be6f-f9a6-4b42-a1cd-f24e4886ffb0'; -- LSG vs DC
    match_41_id UUID := 'a9aa4101-91aa-4fc6-b81a-a5aa43237c8a'; -- SRH vs MI
    match_42_id UUID := 'def09044-b291-4bb4-aca5-ce6718170791'; -- RCB vs RR
    match_43_id UUID := 'a2ec2e2e-e607-4dd3-a6f3-c157b7940bb2'; -- CSK vs SRH
    match_44_id UUID := 'cd7c5369-aff9-4905-97bc-3a6d7a93ae6b'; -- KKR vs PBKS
    match_45_id UUID := '69f6c4f3-186b-41ba-8dc2-cb4c5e37c21a'; -- MI vs LSG
    match_46_id UUID := '25f85ef3-5756-4ec9-86b6-d63d1a3d8337'; -- DC vs RCB
    match_47_id UUID := '3776ec73-f0cf-496a-a50c-9a4e338b773e'; -- RR vs GT
    match_48_id UUID := 'e9590fa5-b943-447c-8a33-f814ef9c71a8'; -- DC vs KKR
    match_49_id UUID := '5ec21ad1-3302-49d8-bb90-7120f883e588'; -- CSK vs PBKS
    match_50_id UUID := 'c8334e74-bd07-4533-8467-0c6d89604934'; -- RR vs MI
    match_51_id UUID := '7dc6bb42-1bdc-4117-8f52-191f30667ec8'; -- GT vs SRH
    match_52_id UUID := '6d8b5720-0ff1-423c-b80d-62c0e2e6d305'; -- RCB vs CSK
    match_53_id UUID := '3bb98190-6db6-4e53-9b9b-1cf62bafa980'; -- KKR vs RR
    match_54_id UUID := 'e745a859-8185-48bb-ad67-f2d963da8121'; -- PBKS vs LSG
    match_55_id UUID := '8ddb390b-cdc6-4cca-8be6-bfaeb9a6fc70'; -- SRH vs DC
    match_56_id UUID := '516b71e6-f6ff-46bf-96e1-f8f9ebcdc287'; -- MI vs GT
    match_57_id UUID := '98c289d0-e963-4da8-a960-35d7ae709276'; -- KKR vs CSK
    match_58_id UUID := '02280e31-6b70-473c-95e0-4e6b02eb4ebb'; -- PBKS vs DC
    match_59_id UUID := '13c6919f-ce52-4542-ace1-1fe43db54a5e'; -- LSG vs RCB
    match_60_id UUID := 'e8a64cb2-d5be-424b-af95-adbc3e50cfb9'; -- SRH vs KKR
    match_61_id UUID := 'a9322698-bf0b-4638-a30f-24a12f02da2f'; -- PBKS vs MI
    match_62_id UUID := 'e197ee97-6c06-4c86-8b8a-2768d3aa3994'; -- DC vs GT
    match_63_id UUID := 'b9d5f1cc-07f8-452f-97d0-d504e2d11ab4'; -- CSK vs RR
    match_64_id UUID := 'cf44157a-195e-450f-9bf3-a3edec226117'; -- RCB vs SRH
    match_65_id UUID := '03e1df00-58c3-4028-b642-0bed1bb11e9b'; -- GT vs LSG
    match_66_id UUID := 'a021626c-ae67-4cd5-ba9c-ed54d5ad90b8'; -- MI vs DC
    match_67_id UUID := '9daa2dfa-111a-49c7-b632-6eac8bd7fad8'; -- RR vs PBKS
    match_68_id UUID := '9598d026-035e-4682-aa7d-64731c01acdd'; -- RCB vs KKR
    match_69_id UUID := '10ac0db4-8e7b-4de9-a455-c9fd5bf4f396'; -- GT vs CSK
    match_70_id UUID := 'af47a0c9-cb0c-408d-abc1-79f8edc27f71'; -- LSG vs SRH

BEGIN
    -- Insert Matches (converting SGT to UTC by subtracting 8 hours)
    INSERT INTO matches (
        id, 
        first_team_id, 
        second_team_id, 
        venue_id, 
        datetime, 
        outcome_winning_team,
        outcome_total_score,
        outcome_more_or_less,
        bet_amount
    ) VALUES
    -- Match 1: KKR vs RCB at Kolkata
    (match_1_id,
     '0e15ecb5-26b7-4a23-9103-500f4f88b365', -- KKR
     '9198b9ed-3cfd-41ad-b4fa-dffd5ea9219a', -- RCB
     '288c830d-fa4a-478f-ba3f-311d50251c88', -- Kolkata
     '2025-03-22 14:00:00+00', -- 22:00 SGT converted to UTC
     '9198b9ed-3cfd-41ad-b4fa-dffd5ea9219a', -- Winning team
     NULL, -- Total score
     'MORE', -- More or less
     5
    ),

    -- Match 2: SRH vs RR at Hyderabad
    (match_2_id,
     '6c4d7ebd-a3b7-4614-8ace-4a4b9cc4df53', -- SRH
     '8d96a373-57e9-4b39-a81f-9b2bd9a33134', -- RR
     '44fe4eb1-0342-4dc4-8e96-e0f66f83a648', -- Hyderabad
     '2025-03-23 10:00:00+00', -- 18:00 SGT converted to UTC
     '6c4d7ebd-a3b7-4614-8ace-4a4b9cc4df53', -- Winning team
     NULL, -- Total score
     'MORE', -- More or less
     5
    ),

    -- Match 3: CSK vs MI at Chennai
    (match_3_id,
     'ea73347a-a243-4e3f-829c-06ba382ded12', -- CSK
     '05ccf6c4-c7bb-486b-9487-28fd17d2dedd', -- MI
     '67585d30-ecae-43d6-9152-32df7dcd061e', -- Chennai
     '2025-03-23 14:00:00+00', -- 22:00 SGT converted to UTC
     'ea73347a-a243-4e3f-829c-06ba382ded12', -- Winning team
     NULL, -- Total score
     'LESS', -- More or less
     5
    ),

    -- Match 4: DC vs LSG at Visakhapatnam
    (match_4_id,
     '023f3967-cdc8-409a-ae44-0e98a4381b37', -- DC
     '09e0b78b-5f75-479e-9f6c-501bac6e726a', -- LSG
     '91132c0a-bf06-44d6-9380-f2864f950f4d', -- Visakhapatnam
     '2025-03-24 14:00:00+00', -- 22:00 SGT converted to UTC
     '023f3967-cdc8-409a-ae44-0e98a4381b37', -- Winning team
     NULL, -- Total score
     'MORE', -- More or less
     5
    ),

    -- Match 5: GT vs PBKS at Ahmedabad
    (match_5_id,
     'b1659aec-827c-4c99-b58e-52aa4ebb25b8', -- GT
     '56b2b5c3-6666-4c02-b436-2d8934f294dd', -- PBKS
     '64524cec-7f5f-45e0-a082-6425f683ee08', -- Ahmedabad
     '2025-03-25 14:00:00+00', -- 22:00 SGT converted to UTC
     '56b2b5c3-6666-4c02-b436-2d8934f294dd', -- Winning team
     NULL, -- Total score
     'MORE', -- More or less
     5
    ),

    -- Match 6: RR vs KKR at Guwahati
    (match_6_id,
     '8d96a373-57e9-4b39-a81f-9b2bd9a33134', -- RR
     '0e15ecb5-26b7-4a23-9103-500f4f88b365', -- KKR
     '0eb6630d-3ebf-4b9b-b11c-bcdd43df7157', -- Guwahati
     '2025-03-26 14:00:00+00', -- 22:00 SGT converted to UTC
     '0e15ecb5-26b7-4a23-9103-500f4f88b365', -- Winning team
     NULL, -- Total score
     'LESS', -- More or less
     5
    ),

    -- Match 7: SRH vs LSG at Hyderabad
    (match_7_id,
     '6c4d7ebd-a3b7-4614-8ace-4a4b9cc4df53', -- SRH
     '09e0b78b-5f75-479e-9f6c-501bac6e726a', -- LSG
     '44fe4eb1-0342-4dc4-8e96-e0f66f83a648', -- Hyderabad
     '2025-03-27 14:00:00+00', -- 22:00 SGT converted to UTC
     '09e0b78b-5f75-479e-9f6c-501bac6e726a', -- Winning team
     NULL, -- Total score
     'MORE', -- More or less
     5
    ),

    -- Match 8: CSK vs RCB at Chennai
    (match_8_id,
     'ea73347a-a243-4e3f-829c-06ba382ded12', -- CSK
     '9198b9ed-3cfd-41ad-b4fa-dffd5ea9219a', -- RCB
     '67585d30-ecae-43d6-9152-32df7dcd061e', -- Chennai
     '2025-03-28 14:00:00+00', -- 22:00 SGT converted to UTC
     '9198b9ed-3cfd-41ad-b4fa-dffd5ea9219a', -- Winning team
     NULL, -- Total score
     'LESS', -- More or less
     5
    ),

    -- Match 9: GT vs MI at Ahmedabad
    (match_9_id,
     'b1659aec-827c-4c99-b58e-52aa4ebb25b8', -- GT
     '05ccf6c4-c7bb-486b-9487-28fd17d2dedd', -- MI
     '64524cec-7f5f-45e0-a082-6425f683ee08', -- Ahmedabad
     '2025-03-29 14:00:00+00', -- 22:00 SGT converted to UTC
     'b1659aec-827c-4c99-b58e-52aa4ebb25b8', -- Winning team
     NULL, -- Total score
     'MORE', -- More or less
     5
    ),

    -- Match 10: DC vs SRH at Visakhapatnam
    (match_10_id,
     '023f3967-cdc8-409a-ae44-0e98a4381b37', -- DC
     '6c4d7ebd-a3b7-4614-8ace-4a4b9cc4df53', -- SRH
     '91132c0a-bf06-44d6-9380-f2864f950f4d', -- Visakhapatnam
     '2025-03-30 10:00:00+00', -- 18:00 SGT converted to UTC
     '023f3967-cdc8-409a-ae44-0e98a4381b37', -- Winning team
     NULL, -- Total score
     'LESS', -- More or less
     5
    ),

    -- Match 11: RR vs CSK at Guwahati
    (match_11_id,
     '8d96a373-57e9-4b39-a81f-9b2bd9a33134', -- RR
     'ea73347a-a243-4e3f-829c-06ba382ded12', -- CSK
     '0eb6630d-3ebf-4b9b-b11c-bcdd43df7157', -- Guwahati
     '2025-03-30 14:00:00+00', -- 22:00 SGT converted to UTC
     '8d96a373-57e9-4b39-a81f-9b2bd9a33134', -- Winning team
     NULL, -- Total score
     'LESS', -- More or less
     5
    ),

    -- Match 12: MI vs KKR at Mumbai
    (match_12_id,
     '05ccf6c4-c7bb-486b-9487-28fd17d2dedd', -- MI
     '0e15ecb5-26b7-4a23-9103-500f4f88b365', -- KKR
     '67c9ea53-b791-477c-abea-90eac8c4a20a', -- Mumbai
     '2025-03-31 14:00:00+00', -- 22:00 SGT converted to UTC
     '05ccf6c4-c7bb-486b-9487-28fd17d2dedd', -- Winning team
     NULL, -- Total score
     'LESS', -- More or less
     5
    ),

    -- Match 13: LSG vs PBKS at Lucknow
    (match_13_id,
     '09e0b78b-5f75-479e-9f6c-501bac6e726a', -- LSG
     '56b2b5c3-6666-4c02-b436-2d8934f294dd', -- PBKS
     'f5b09172-48f3-43f5-9727-70695a5f1c24', -- Lucknow
     '2025-04-1 14:00:00+00', -- 22:00 SGT converted to UTC
     '56b2b5c3-6666-4c02-b436-2d8934f294dd', -- Winning team
     NULL, -- Total score
     'LESS', -- More or less
     5
    ),

    -- Match 14: RCB vs GT at Bengaluru
    (match_14_id,
     '9198b9ed-3cfd-41ad-b4fa-dffd5ea9219a', -- RCB
     'b1659aec-827c-4c99-b58e-52aa4ebb25b8', -- GT
     '6a8f82b0-9b42-44f9-b44d-dab75a2ed368', -- Bengaluru
     '2025-04-2 14:00:00+00', -- 22:00 SGT converted to UTC
     'b1659aec-827c-4c99-b58e-52aa4ebb25b8', -- Winning team
     NULL, -- Total score
     'LESS', -- More or less
     5
    ),

    -- Match 15: KKR vs SRH at Kolkata
    (match_15_id,
     '0e15ecb5-26b7-4a23-9103-500f4f88b365', -- KKR
     '6c4d7ebd-a3b7-4614-8ace-4a4b9cc4df53', -- SRH
     '288c830d-fa4a-478f-ba3f-311d50251c88', -- Kolkata
     '2025-04-3 14:00:00+00', -- 22:00 SGT converted to UTC
     '0e15ecb5-26b7-4a23-9103-500f4f88b365', -- Winning team
     NULL, -- Total score
     'LESS', -- More or less
     5
    ),

    -- Match 16: LSG vs MI at Lucknow
    (match_16_id,
     '09e0b78b-5f75-479e-9f6c-501bac6e726a', -- LSG
     '05ccf6c4-c7bb-486b-9487-28fd17d2dedd', -- MI
     'f5b09172-48f3-43f5-9727-70695a5f1c24', -- Lucknow
     '2025-04-4 14:00:00+00', -- 22:00 SGT converted to UTC
     '09e0b78b-5f75-479e-9f6c-501bac6e726a', -- Winning team
     NULL, -- Total score
     'MORE', -- More or less
     5
    ),

    -- Match 17: CSK vs DC at Chennai
    (match_17_id,
     'ea73347a-a243-4e3f-829c-06ba382ded12', -- CSK
     '023f3967-cdc8-409a-ae44-0e98a4381b37', -- DC
     '67585d30-ecae-43d6-9152-32df7dcd061e', -- Chennai
     '2025-04-5 10:00:00+00', -- 18:00 SGT converted to UTC
     '023f3967-cdc8-409a-ae44-0e98a4381b37', -- Winning team
     NULL, -- Total score
     'LESS', -- More or less
     5
    ),

    -- Match 18: PBKS vs RR at New Chandigarh
    (match_18_id,
     '56b2b5c3-6666-4c02-b436-2d8934f294dd', -- PBKS
     '8d96a373-57e9-4b39-a81f-9b2bd9a33134', -- RR
     'ff760c2d-4e7f-4aad-aa31-6930ce6d87c4', -- New Chandigarh
     '2025-04-5 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     5
    ),

    -- Match 19: SRH vs GT at Hyderabad
    (match_19_id,
     '6c4d7ebd-a3b7-4614-8ace-4a4b9cc4df53', -- SRH
     'b1659aec-827c-4c99-b58e-52aa4ebb25b8', -- GT
     '44fe4eb1-0342-4dc4-8e96-e0f66f83a648', -- Hyderabad
     '2025-04-6 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     5
    ),

    -- Match 20: MI vs RCB at Mumbai
    (match_20_id,
     '05ccf6c4-c7bb-486b-9487-28fd17d2dedd', -- MI
     '9198b9ed-3cfd-41ad-b4fa-dffd5ea9219a', -- RCB
     '67c9ea53-b791-477c-abea-90eac8c4a20a', -- Mumbai
     '2025-04-7 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     5
    ),

    -- Match 21: KKR vs LSG at Kolkata
    (match_21_id,
     '0e15ecb5-26b7-4a23-9103-500f4f88b365', -- KKR
     '09e0b78b-5f75-479e-9f6c-501bac6e726a', -- LSG
     '288c830d-fa4a-478f-ba3f-311d50251c88', -- Kolkata
     '2025-04-6 10:00:00+00', -- 18:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     5
    ),

    -- Match 22: PBKS vs CSK at New Chandigarh
    (match_22_id,
     '56b2b5c3-6666-4c02-b436-2d8934f294dd', -- PBKS
     'ea73347a-a243-4e3f-829c-06ba382ded12', -- CSK
     'ff760c2d-4e7f-4aad-aa31-6930ce6d87c4', -- New Chandigarh
     '2025-04-8 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     5
    ),

    -- Match 23: GT vs RR at Ahmedabad
    (match_23_id,
     'b1659aec-827c-4c99-b58e-52aa4ebb25b8', -- GT
     '8d96a373-57e9-4b39-a81f-9b2bd9a33134', -- RR
     '64524cec-7f5f-45e0-a082-6425f683ee08', -- Ahmedabad
     '2025-04-9 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     5
    ),

    -- Match 24: RCB vs DC at Bengaluru
    (match_24_id,
     '9198b9ed-3cfd-41ad-b4fa-dffd5ea9219a', -- RCB
     '023f3967-cdc8-409a-ae44-0e98a4381b37', -- DC
     '6a8f82b0-9b42-44f9-b44d-dab75a2ed368', -- Bengaluru
     '2025-04-10 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     5
    ),

    -- Match 25: CSK vs KKR at Chennai
    (match_25_id,
     'ea73347a-a243-4e3f-829c-06ba382ded12', -- CSK
     '0e15ecb5-26b7-4a23-9103-500f4f88b365', -- KKR
     '67585d30-ecae-43d6-9152-32df7dcd061e', -- Chennai
     '2025-04-11 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     5
    ),

    -- Match 26: LSG vs GT at Lucknow
    (match_26_id,
     '09e0b78b-5f75-479e-9f6c-501bac6e726a', -- LSG
     'b1659aec-827c-4c99-b58e-52aa4ebb25b8', -- GT
     'f5b09172-48f3-43f5-9727-70695a5f1c24', -- Lucknow
     '2025-04-12 10:00:00+00', -- 18:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     5
    ),

    -- Match 27: SRH vs PBKS at Hyderabad
    (match_27_id,
     '6c4d7ebd-a3b7-4614-8ace-4a4b9cc4df53', -- SRH
     '56b2b5c3-6666-4c02-b436-2d8934f294dd', -- PBKS
     '44fe4eb1-0342-4dc4-8e96-e0f66f83a648', -- Hyderabad
     '2025-04-12 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     5
    ),

    -- Match 28: RR vs RCB at Jaipur
    (match_28_id,
     '8d96a373-57e9-4b39-a81f-9b2bd9a33134', -- RR
     '9198b9ed-3cfd-41ad-b4fa-dffd5ea9219a', -- RCB
     'dd161096-c397-4e78-8110-f68dd6cc5f15', -- Jaipur
     '2025-04-13 10:00:00+00', -- 18:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     5
    ),

    -- Match 29: DC vs MI at Delhi
    (match_29_id,
     '023f3967-cdc8-409a-ae44-0e98a4381b37', -- DC
     '05ccf6c4-c7bb-486b-9487-28fd17d2dedd', -- MI
     '4e851739-dabd-42f9-aae5-ed24f94c703e', -- Delhi
     '2025-04-13 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     5
    ),

    -- Match 30: LSG vs CSK at Lucknow
    (match_30_id,
     '09e0b78b-5f75-479e-9f6c-501bac6e726a', -- LSG
     'ea73347a-a243-4e3f-829c-06ba382ded12', -- CSK
     'f5b09172-48f3-43f5-9727-70695a5f1c24', -- Lucknow
     '2025-04-14 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     5
    ),

    -- Match 31: PBKS vs KKR at New Chandigarh
    (match_31_id,
     '56b2b5c3-6666-4c02-b436-2d8934f294dd', -- PBKS
     '0e15ecb5-26b7-4a23-9103-500f4f88b365', -- KKR
     'ff760c2d-4e7f-4aad-aa31-6930ce6d87c4', -- New Chandigarh
     '2025-04-15 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     5
    ),

    -- Match 32: DC vs RR at Delhi
    (match_32_id,
     '023f3967-cdc8-409a-ae44-0e98a4381b37', -- DC
     '8d96a373-57e9-4b39-a81f-9b2bd9a33134', -- RR
     '4e851739-dabd-42f9-aae5-ed24f94c703e', -- Delhi
     '2025-04-16 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     5
    ),

    -- Match 33: MI vs SRH at Mumbai
    (match_33_id,
     '05ccf6c4-c7bb-486b-9487-28fd17d2dedd', -- MI
     '6c4d7ebd-a3b7-4614-8ace-4a4b9cc4df53', -- SRH
     '67c9ea53-b791-477c-abea-90eac8c4a20a', -- Mumbai
     '2025-04-17 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     5
    ),

    -- Match 34: RCB vs PBKS at Bengaluru
    (match_34_id,
     '9198b9ed-3cfd-41ad-b4fa-dffd5ea9219a', -- RCB
     '56b2b5c3-6666-4c02-b436-2d8934f294dd', -- PBKS
     '6a8f82b0-9b42-44f9-b44d-dab75a2ed368', -- Bengaluru
     '2025-04-18 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     5
    ),

    -- Match 35: GT vs DC at Ahmedabad
    (match_35_id,
     'b1659aec-827c-4c99-b58e-52aa4ebb25b8', -- GT
     '023f3967-cdc8-409a-ae44-0e98a4381b37', -- DC
     '64524cec-7f5f-45e0-a082-6425f683ee08', -- Ahmedabad
     '2025-04-19 10:00:00+00', -- 18:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     5
    ),

    -- Match 36: RR vs LSG at Jaipur
    (match_36_id,
     '8d96a373-57e9-4b39-a81f-9b2bd9a33134', -- RR
     '09e0b78b-5f75-479e-9f6c-501bac6e726a', -- LSG
     'dd161096-c397-4e78-8110-f68dd6cc5f15', -- Jaipur
     '2025-04-19 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 37: PBKS vs RCB at New Chandigarh
    (match_37_id,
     '56b2b5c3-6666-4c02-b436-2d8934f294dd', -- PBKS
     '9198b9ed-3cfd-41ad-b4fa-dffd5ea9219a', -- RCB
     'ff760c2d-4e7f-4aad-aa31-6930ce6d87c4', -- New Chandigarh
     '2025-04-20 10:00:00+00', -- 18:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 38: MI vs CSK at Mumbai
    (match_38_id,
     '05ccf6c4-c7bb-486b-9487-28fd17d2dedd', -- MI
     'ea73347a-a243-4e3f-829c-06ba382ded12', -- CSK
     '67c9ea53-b791-477c-abea-90eac8c4a20a', -- Mumbai
     '2025-04-20 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 39: KKR vs GT at Kolkata
    (match_39_id,
     '0e15ecb5-26b7-4a23-9103-500f4f88b365', -- KKR
     'b1659aec-827c-4c99-b58e-52aa4ebb25b8', -- GT
     '288c830d-fa4a-478f-ba3f-311d50251c88', -- Kolkata
     '2025-04-21 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 40: LSG vs DC at Lucknow
    (match_40_id,
     '09e0b78b-5f75-479e-9f6c-501bac6e726a', -- LSG
     '023f3967-cdc8-409a-ae44-0e98a4381b37', -- DC
     'f5b09172-48f3-43f5-9727-70695a5f1c24', -- Lucknow
     '2025-04-22 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 41: SRH vs MI at Hyderabad
    (match_41_id,
     '6c4d7ebd-a3b7-4614-8ace-4a4b9cc4df53', -- SRH
     '05ccf6c4-c7bb-486b-9487-28fd17d2dedd', -- MI
     '44fe4eb1-0342-4dc4-8e96-e0f66f83a648', -- Hyderabad
     '2025-04-23 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 42: RCB vs RR at Bengaluru
    (match_42_id,
     '9198b9ed-3cfd-41ad-b4fa-dffd5ea9219a', -- RCB
     '8d96a373-57e9-4b39-a81f-9b2bd9a33134', -- RR
     '6a8f82b0-9b42-44f9-b44d-dab75a2ed368', -- Bengaluru
     '2025-04-24 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 43: CSK vs SRH at Chennai
    (match_43_id,
     'ea73347a-a243-4e3f-829c-06ba382ded12', -- CSK
     '6c4d7ebd-a3b7-4614-8ace-4a4b9cc4df53', -- SRH
     '67585d30-ecae-43d6-9152-32df7dcd061e', -- Chennai
     '2025-04-25 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 44: KKR vs PBKS at Kolkata
    (match_44_id,
     '0e15ecb5-26b7-4a23-9103-500f4f88b365', -- KKR
     '56b2b5c3-6666-4c02-b436-2d8934f294dd', -- PBKS
     '288c830d-fa4a-478f-ba3f-311d50251c88', -- Kolkata
     '2025-04-26 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 45: MI vs LSG at Mumbai
    (match_45_id,
     '05ccf6c4-c7bb-486b-9487-28fd17d2dedd', -- MI
     '09e0b78b-5f75-479e-9f6c-501bac6e726a', -- LSG
     '67c9ea53-b791-477c-abea-90eac8c4a20a', -- Mumbai
     '2025-04-27 10:00:00+00', -- 18:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 46: DC vs RCB at Delhi
    (match_46_id,
     '023f3967-cdc8-409a-ae44-0e98a4381b37', -- DC
     '9198b9ed-3cfd-41ad-b4fa-dffd5ea9219a', -- RCB
     '4e851739-dabd-42f9-aae5-ed24f94c703e', -- Delhi
     '2025-04-27 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 47: RR vs GT at Jaipur
    (match_47_id,
     '8d96a373-57e9-4b39-a81f-9b2bd9a33134', -- RR
     'b1659aec-827c-4c99-b58e-52aa4ebb25b8', -- GT
     'dd161096-c397-4e78-8110-f68dd6cc5f15', -- Jaipur
     '2025-04-28 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 48: DC vs KKR at Delhi
    (match_48_id,
     '023f3967-cdc8-409a-ae44-0e98a4381b37', -- DC
     '0e15ecb5-26b7-4a23-9103-500f4f88b365', -- KKR
     '4e851739-dabd-42f9-aae5-ed24f94c703e', -- Delhi
     '2025-04-29 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 49: CSK vs PBKS at Chennai
    (match_49_id,
     'ea73347a-a243-4e3f-829c-06ba382ded12', -- CSK
     '56b2b5c3-6666-4c02-b436-2d8934f294dd', -- PBKS
     '67585d30-ecae-43d6-9152-32df7dcd061e', -- Chennai
     '2025-04-30 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 50: RR vs MI at Jaipur
    (match_50_id,
     '8d96a373-57e9-4b39-a81f-9b2bd9a33134', -- RR
     '05ccf6c4-c7bb-486b-9487-28fd17d2dedd', -- MI
     'dd161096-c397-4e78-8110-f68dd6cc5f15', -- Jaipur
     '2025-05-1 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 51: GT vs SRH at Ahmedabad
    (match_51_id,
     'b1659aec-827c-4c99-b58e-52aa4ebb25b8', -- GT
     '6c4d7ebd-a3b7-4614-8ace-4a4b9cc4df53', -- SRH
     '64524cec-7f5f-45e0-a082-6425f683ee08', -- Ahmedabad
     '2025-05-2 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 52: RCB vs CSK at Bengaluru
    (match_52_id,
     '9198b9ed-3cfd-41ad-b4fa-dffd5ea9219a', -- RCB
     'ea73347a-a243-4e3f-829c-06ba382ded12', -- CSK
     '6a8f82b0-9b42-44f9-b44d-dab75a2ed368', -- Bengaluru
     '2025-05-3 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 53: KKR vs RR at Kolkata
    (match_53_id,
     '0e15ecb5-26b7-4a23-9103-500f4f88b365', -- KKR
     '8d96a373-57e9-4b39-a81f-9b2bd9a33134', -- RR
     '288c830d-fa4a-478f-ba3f-311d50251c88', -- Kolkata
     '2025-05-4 10:00:00+00', -- 18:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 54: PBKS vs LSG at Dharamsala
    (match_54_id,
     '56b2b5c3-6666-4c02-b436-2d8934f294dd', -- PBKS
     '09e0b78b-5f75-479e-9f6c-501bac6e726a', -- LSG
     '7ac9e82d-7055-4de9-bab8-74f5edb39cf1', -- Dharamsala
     '2025-05-4 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 55: SRH vs DC at Hyderabad
    (match_55_id,
     '6c4d7ebd-a3b7-4614-8ace-4a4b9cc4df53', -- SRH
     '023f3967-cdc8-409a-ae44-0e98a4381b37', -- DC
     '44fe4eb1-0342-4dc4-8e96-e0f66f83a648', -- Hyderabad
     '2025-05-5 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 56: MI vs GT at Mumbai
    (match_56_id,
     '05ccf6c4-c7bb-486b-9487-28fd17d2dedd', -- MI
     'b1659aec-827c-4c99-b58e-52aa4ebb25b8', -- GT
     '67c9ea53-b791-477c-abea-90eac8c4a20a', -- Mumbai
     '2025-05-6 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 57: KKR vs CSK at Kolkata
    (match_57_id,
     '0e15ecb5-26b7-4a23-9103-500f4f88b365', -- KKR
     'ea73347a-a243-4e3f-829c-06ba382ded12', -- CSK
     '288c830d-fa4a-478f-ba3f-311d50251c88', -- Kolkata
     '2025-05-7 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 58: PBKS vs DC at Dharamsala
    (match_58_id,
     '56b2b5c3-6666-4c02-b436-2d8934f294dd', -- PBKS
     '023f3967-cdc8-409a-ae44-0e98a4381b37', -- DC
     '7ac9e82d-7055-4de9-bab8-74f5edb39cf1', -- Dharamsala
     '2025-05-8 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 59: LSG vs RCB at Lucknow
    (match_59_id,
     '09e0b78b-5f75-479e-9f6c-501bac6e726a', -- LSG
     '9198b9ed-3cfd-41ad-b4fa-dffd5ea9219a', -- RCB
     'f5b09172-48f3-43f5-9727-70695a5f1c24', -- Lucknow
     '2025-05-9 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 60: SRH vs KKR at Hyderabad
    (match_60_id,
     '6c4d7ebd-a3b7-4614-8ace-4a4b9cc4df53', -- SRH
     '0e15ecb5-26b7-4a23-9103-500f4f88b365', -- KKR
     '44fe4eb1-0342-4dc4-8e96-e0f66f83a648', -- Hyderabad
     '2025-05-10 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 61: PBKS vs MI at Dharamsala
    (match_61_id,
     '56b2b5c3-6666-4c02-b436-2d8934f294dd', -- PBKS
     '05ccf6c4-c7bb-486b-9487-28fd17d2dedd', -- MI
     '7ac9e82d-7055-4de9-bab8-74f5edb39cf1', -- Dharamsala
     '2025-05-11 10:00:00+00', -- 18:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 62: DC vs GT at Delhi
    (match_62_id,
     '023f3967-cdc8-409a-ae44-0e98a4381b37', -- DC
     'b1659aec-827c-4c99-b58e-52aa4ebb25b8', -- GT
     '4e851739-dabd-42f9-aae5-ed24f94c703e', -- Delhi
     '2025-05-11 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 63: CSK vs RR at Chennai
    (match_63_id,
     'ea73347a-a243-4e3f-829c-06ba382ded12', -- CSK
     '8d96a373-57e9-4b39-a81f-9b2bd9a33134', -- RR
     '67585d30-ecae-43d6-9152-32df7dcd061e', -- Chennai
     '2025-05-12 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 64: RCB vs SRH at Bengaluru
    (match_64_id,
     '9198b9ed-3cfd-41ad-b4fa-dffd5ea9219a', -- RCB
     '6c4d7ebd-a3b7-4614-8ace-4a4b9cc4df53', -- SRH
     '6a8f82b0-9b42-44f9-b44d-dab75a2ed368', -- Bengaluru
     '2025-05-13 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 65: GT vs LSG at Ahmedabad
    (match_65_id,
     'b1659aec-827c-4c99-b58e-52aa4ebb25b8', -- GT
     '09e0b78b-5f75-479e-9f6c-501bac6e726a', -- LSG
     '64524cec-7f5f-45e0-a082-6425f683ee08', -- Ahmedabad
     '2025-05-14 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 66: MI vs DC at Mumbai
    (match_66_id,
     '05ccf6c4-c7bb-486b-9487-28fd17d2dedd', -- MI
     '023f3967-cdc8-409a-ae44-0e98a4381b37', -- DC
     '67c9ea53-b791-477c-abea-90eac8c4a20a', -- Mumbai
     '2025-05-15 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 67: RR vs PBKS at Jaipur
    (match_67_id,
     '8d96a373-57e9-4b39-a81f-9b2bd9a33134', -- RR
     '56b2b5c3-6666-4c02-b436-2d8934f294dd', -- PBKS
     'dd161096-c397-4e78-8110-f68dd6cc5f15', -- Jaipur
     '2025-05-16 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 68: RCB vs KKR at Bengaluru
    (match_68_id,
     '9198b9ed-3cfd-41ad-b4fa-dffd5ea9219a', -- RCB
     '0e15ecb5-26b7-4a23-9103-500f4f88b365', -- KKR
     '6a8f82b0-9b42-44f9-b44d-dab75a2ed368', -- Bengaluru
     '2025-05-17 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 69: GT vs CSK at Ahmedabad
    (match_69_id,
     'b1659aec-827c-4c99-b58e-52aa4ebb25b8', -- GT
     'ea73347a-a243-4e3f-829c-06ba382ded12', -- CSK
     '64524cec-7f5f-45e0-a082-6425f683ee08', -- Ahmedabad
     '2025-05-18 10:00:00+00', -- 18:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    ),

    -- Match 70: LSG vs SRH at Lucknow
    (match_70_id,
     '09e0b78b-5f75-479e-9f6c-501bac6e726a', -- LSG
     '6c4d7ebd-a3b7-4614-8ace-4a4b9cc4df53', -- SRH
     'f5b09172-48f3-43f5-9727-70695a5f1c24', -- Lucknow
     '2025-05-18 14:00:00+00', -- 22:00 SGT converted to UTC
     NULL, -- Winning team
     NULL, -- Total score
     NULL, -- More or less
     10
    );

END $$;
